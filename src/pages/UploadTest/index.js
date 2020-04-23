import React from 'react';
import axios from 'axios';
import ImageUpload from '../../components/ImageUpload';

export default function UploadTest() {
  const handleSubmit = (formData) => {
    axios.post(`${process.env.REACT_APP_API_URL}/teste`, formData);
  };

  return <ImageUpload fileName="teste" onSubmit={handleSubmit} />;
}
