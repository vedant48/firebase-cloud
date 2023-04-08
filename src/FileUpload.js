import { useState, useEffect } from 'react';
import { db, storage } from './App';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

const FileUpload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Listen for file uploads in Firebase Storage
    const storageRef = ref(storage, `files/${user.uid}`);
    const files = [];

    listAll(storageRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          files.push({ name: itemRef.name, url });
          setUserFiles([...files]);
        });
      });
    });
  }, [user]);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    // Upload file to Firebase Storage
    const storageRef = ref(storage, `files/${user.uid}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File uploaded:', downloadURL);
    setFile(null);
    setFileName('');
    setUploading(false);
  };

  const handleFileDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.click();
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <label>
          Select file:
          <input type="file" onChange={handleFileInputChange} />
        </label>
        <br />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {userFiles.length > 0 && (
        <>
          <h2>My files:</h2>
          <ul>
            {userFiles.map((file) => (
              <li key={file.url}>
                <a href="#" onClick={() => handleFileDownload(file.url)}>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FileUpload;
