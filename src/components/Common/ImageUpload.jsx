import React, { useRef } from 'react';
import { Image, Upload, Trash2 } from 'lucide-react';

const ImageUpload = ({ currentImage, onImageUpload, onImageRemove, accept = 'image/*' }) => {
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      {currentImage ? (
        <div className="text-center">
          <div 
            className="w-full h-48 rounded-xl mb-4 bg-cover bg-center border-2 border-dashed border-gray-300"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
          <button
            onClick={onImageRemove}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-105 mx-auto"
          >
            <Trash2 className="w-4 h-4" />
            Remove Image
          </button>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium mb-2">Upload Background Image</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Click to select an image from your device
          </p>
          <div className="flex items-center gap-2 justify-center text-pink-500">
            <Upload className="w-4 h-4" />
            <span>Choose Image</span>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Supported formats: JPG, PNG, GIF • Max size: 5MB
      </p>
    </div>
  );
};

export default ImageUpload;