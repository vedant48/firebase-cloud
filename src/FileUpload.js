import { useState, useEffect } from 'react';
import { db, storage } from './App';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import './FileUpload.css'

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
      {/* <form onSubmit={handleFileUpload}> */}
        {/* <label>
          Select file:
          <input type="file" onChange={handleFileInputChange} />
        </label> */}
        <div className="frame">
          <div className="center">
            <div className="title">
              <h1>Drop file to upload</h1>
            </div>
            <div className="dropzone">
              <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" />
              <input type="file" onChange={handleFileInputChange} className="upload-input" />
            </div>
            <button onClick={handleFileUpload} type="submit" disabled={!file || uploading} className="btn" name="uploadbutton">{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </div>
        {/* <br />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button> */}
      {/* </form> */}

      {userFiles.length > 0 && (
        <>
          <h2>My files:</h2>
          <ul>
            {userFiles.map((file) => (
            <li style={{backgroundColor: '#ab487d', margin: '10px 5px', borderRadius: '10px', padding: '10px'}} key={file.url}>
                <a style={{color: 'white', textDecoration: 'none'}} href="#" onClick={() => handleFileDownload(file.url)}>
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
