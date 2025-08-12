// pages/N.AdminDashboard/Suppliers/FileUpload.tsx
import { Upload, Trash2 } from "lucide-react";

type Props = {
  label: string;
  multiple?: boolean;
  value?: string | string[];
  onChange: (files: FileList) => void;
  onRemove?: (index: number) => void;
};

export default function FileUpload({ label, multiple = false, value, onChange, onRemove }: Props) {
  const filesArray = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div>
      <label className="block text-sm mb-2 text-slate-200">{label}</label>
      <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
        {filesArray.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {filesArray.map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={file}
                  alt={`${label}-${idx}`}
                  className="h-16 w-16 object-cover rounded border border-slate-700"
                />
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Upload className="mx-auto mb-2 text-slate-400" size={32} />
        )}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => e.target.files && onChange(e.target.files)}
          className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 
                     file:rounded file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-600 file:text-white hover:file:bg-blue-500"
        />
      </div>
    </div>
  );
}
