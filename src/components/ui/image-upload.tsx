import { useState, useRef, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { Label } from './label';

interface ImageUploadProps {
  id: string;
  label: string;
  value?: string;
  onChange: (file: File | null, preview: string) => void;
  onError?: (error: string) => void;
  error?: string;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  placeholder?: string;
  required?: boolean;
}

const ImageUpload = ({
  id,
  label,
  value = '',
  onChange,
  onError,
  error,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  placeholder = 'Télécharger un fichier ou glisser-déposer',
  required = false,
}: ImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string>(value);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when value prop changes
  useEffect(() => {
    setImagePreview(value);
  }, [value]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Validation
      if (file.size > maxSize * 1024 * 1024) {
        const errorMsg = `La taille du fichier ne doit pas dépasser ${maxSize}MB`;
        onError?.(errorMsg);
        return;
      }
      if (!acceptedTypes.includes(file.type)) {
        const errorMsg = 'Format non supporté. Utilisez PNG, JPG ou GIF';
        onError?.(errorMsg);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setImagePreview(preview);
        onChange(file, preview);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview('');
      onChange(null, '');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setImagePreview('');
    onChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
      >
        <div className="space-y-1 text-center">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="mx-auto h-32 w-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Supprimer l'image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  {placeholder}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF jusqu'à {maxSize}MB
              </p>
            </>
          )}
        </div>
      </div>
      <input
        ref={fileInputRef}
        id={id}
        name={id}
        type="file"
        className="sr-only"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        required={required && !imagePreview}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;