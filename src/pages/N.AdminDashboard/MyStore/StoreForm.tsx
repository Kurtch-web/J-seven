import type { StoreFormProps, StoreAccordionSectionsProps } from "./types";
import StoreAccordionSections from "./StoreAccordionSections";

type Props = StoreFormProps & StoreAccordionSectionsProps;

export default function StoreForm(props: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
      {/* Store Name */}
      <div>
        <h4 className="text-md font-bold mb-2 text-white">Store Name</h4>
        <input
          type="text"
          value={props.storeName}
          onChange={(e) => props.setStoreName(e.target.value)}
          className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
        />
      </div>

      {/* Store Logo */}
      <div>
        <h4 className="text-md font-bold mb-2 text-white">Store Logo</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const reader = new FileReader();
              reader.onloadend = () => props.setLogo(reader.result as string);
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 
                     file:rounded file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white hover:file:bg-blue-500"
        />
      </div>

      {/* Accordion Sections */}
      <StoreAccordionSections {...props} />

      {/* Save Changes */}
      <button
        onClick={() => alert("Changes saved!")}
        className="bg-orange-500 hover:bg-orange-600 text-white mt-4 w-full py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
