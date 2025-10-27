import { useApp } from '../contexts/AppContext';

export const useImageUpload = () => {
  const { state, dispatch } = useApp();

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const background = e.target.result;
        dispatch({ type: 'SET_BACKGROUND', payload: background });
        resolve(background);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removeImage = () => {
    dispatch({ type: 'SET_BACKGROUND', payload: '' });
  };

  return {
    background: state.customBackground,
    uploadImage,
    removeImage
  };
};