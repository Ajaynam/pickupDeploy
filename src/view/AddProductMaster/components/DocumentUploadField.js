
// import React, { useState } from 'react'
// import { FormItem, Upload } from '../../../components/ui'
// import { Field } from 'formik'



// const DocumentUploadField = (props) => {
//     const { label, name, children, touched, errors } = props
//     const [file, setFile] = useState('')
//     const onSetFormFile = (form, field, file) => {
//         setFile(URL.createObjectURL(file[0]))
//         form.setFieldValue(field.name, file[0])
//     }

//     return (
//         <FormItem
//             label={label}
//             invalid={errors[name] && touched[name]}
//             errorMessage={errors[name]}
//         >
//             <Field name={name}>
//                 {({ field, form }) => (
//                     <Upload
//                         draggable
//                         className="cursor-pointer h-[300px]"
//                         onChange={(files) => onSetFormFile(form, field, files)}
//                         onFileRemove={(files) =>
//                             onSetFormFile(form, field, files)
//                         }
//                         showList={false}
//                         uploadLimit={1}
//                     >
//                         {field.value ? (
//                             <img
//                                 className="p-3 max-h-[300px]"
//                                 src={file}
//                                 alt=""
//                             />
//                         ) : (
//                             <div className="text-center">
//                                 {children}
//                                 <p className="font-semibold">
//                                     <span className="text-gray-800 dark:text-white">
//                                         Drop your image here, or{' '}
//                                     </span>
//                                     <span className="text-blue-500">
//                                         browse
//                                     </span>
//                                 </p>
//                                 <p className="mt-1 opacity-60 dark:text-white">
//                                     Support: jpeg, png
//                                 </p>
//                             </div>
//                         )}
//                     </Upload>
//                 )}
//             </Field>
//         </FormItem>
//     )
// }


// export default DocumentUploadField



// import React, { useState } from 'react';
// import { FormItem, Upload } from '../../../components/ui';
// import { Field, useField } from 'formik';

// const DocumentUploadField = (props) => {
//   const { label, name, children, touched, errors } = props;
//   const [file, setFile] = useState('');
//   const [field, meta, helpers] = useField(name);

//   const onSetFormFile = (form, field, file) => {
//     setFile(URL.createObjectURL(file[0]));
//     helpers.setValue(file[0]); // Set the file in Formik's form state
//   };

//   return (
//     <FormItem
//       label={label}
//       invalid={meta.error && meta.touched}
//       errorMessage={meta.error}
//     >
//       <Field name={name}>
//         {({ field, form }) => (
//           <Upload
//             draggable
//             className="cursor-pointer h-[300px]"
//             onChange={(files) => onSetFormFile(form, field, files)}
//             onFileRemove={(files) => onSetFormFile(form, field, files)}
//             showList={false}
//             uploadLimit={1}
//           >
//             {field.value ? (
//               <img className="p-3 max-h-[300px]" src={file} alt="" />
//             ) : (
//               <div className="text-center">
//                 {children}
//                 <p className="font-semibold">
//                   <span className="text-gray-800 dark:text-white">
//                     Drop your image here, or{' '}
//                   </span>
//                   <span className="text-blue-500">browse</span>
//                 </p>
//                 <p className="mt-1 opacity-60 dark:text-white">
//                   Support: jpeg, png
//                 </p>
//               </div>
//             )}
//           </Upload>
//         )}
//       </Field>
//     </FormItem>
//   );
// };

// export default DocumentUploadField;




// DocumentUploadField.js
// import React, { useState } from 'react';
// import { FormItem, Upload } from '../../../components/ui';
// import { Field } from 'formik';

// const DocumentUploadField = (props) => {
//   const { label, name, children, touched, errors } = props;
//   const [file, setFile] = useState('');

//   const onSetFormFile = (form, field, file) => {
//     setFile(URL.createObjectURL(file[0]));
//     form.setFieldValue(field.name, file[0]);
//   };

//   const onRemoveFile = (form, field) => {
//     setFile('');
//     form.setFieldValue(field.name, null);
//   };

//   return (
//     <FormItem
//       label={label}
//       invalid={errors[name] && touched[name]}
//       errorMessage={errors[name]}
//     >
//       <Field name={name}>
//         {({ field, form }) => (
//           <Upload
//             draggable
//             className="cursor-pointer h-[300px]"
//             onChange={(files) => onSetFormFile(form, field, files)}
//             onFileRemove={() => onRemoveFile(form, field)}
//             showList={false}
//             uploadLimit={1}
//           >
//             {field.value ? (
//               <img className="p-3 max-h-[300px]" src={file} alt="" />
//             ) : (
//               <div className="text-center">
//                 {children}
//                 <p className="font-semibold">
//                   <span className="text-gray-800 dark:text-white">
//                     Drop your image here, or{' '}
//                   </span>
//                   <span className="text-blue-500">browse</span>
//                 </p>
//                 <p className="mt-1 opacity-60 dark:text-white">
//                   Support: jpeg, png
//                 </p>
//               </div>
//             )}
//           </Upload>
//         )}
//       </Field>
//     </FormItem>
//   );
// };

// export default DocumentUploadField;


// DocumentUploadField.js
import React, { useState } from 'react';
import { FormItem, Upload } from '../../../components/ui';
import { Field } from 'formik';

const DocumentUploadField = (props) => {
  const { label, name, children, touched, errors } = props;
  const [file, setFile] = useState('');

  const onSetFormFile = (form, field, file) => {
    setFile(URL.createObjectURL(file[0]));
    form.setFieldValue(field.name, file[0]);
  };

  const onRemoveFile = (form, field) => {
    setFile('');
    form.setFieldValue(field.name, null);
  };

  return (
    <FormItem
      label={label}
      invalid={errors[name] && touched[name]}
      errorMessage={errors[name]}
    >
      <Field name={name}>
        {({ field, form }) => (
          <Upload
            draggable
            className="cursor-pointer h-[300px]"
            onChange={(files) => onSetFormFile(form, field, files)}
            onFileRemove={() => onRemoveFile(form, field)}
            showList={false}
            uploadLimit={1}
          >
            {field.value ? (
              <img className="p-3 max-h-[300px]" src={file} alt="" />
            ) : (
              <div className="text-center">
                {children}
                <p className="font-semibold">
                  <span className="text-gray-800 dark:text-white">
                    Drop your image here, or{' '}
                  </span>
                  <span className="text-blue-500">browse</span>
                </p>
                <p className="mt-1 opacity-60 dark:text-white">
                  Support: jpeg, png
                </p>
              </div>
            )}
          </Upload>
        )}
      </Field>
    </FormItem>
  );
};

export default DocumentUploadField;


// DocumentUploadField.js
// import React from 'react';
// import { useField } from 'formik';
// import { Upload, FormItem } from '../../../components/ui';

// const DocumentUploadField = ({ label, name, children, touched, errors }) => {
//   const [file, setFile] = React.useState(null);
//   const [preview, setPreview] = React.useState(null);
//   const [fileError, setFileError] = React.useState('');

//   const onFileChange = (files) => {
//     const selectedFile = files[0];

//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     } else {
//       setFile(null);
//       setPreview(null);
//     }
//   };

//   return (
//     <FormItem
//       label={label}
//       invalid={errors[name] && touched[name]}
//       errorMessage={errors[name]}
//     >
//       <Upload
//         draggable
//         className="cursor-pointer h-[300px]"
//         onChange={onFileChange}
//         onFileRemove={() => {
//           setFile(null);
//           setPreview(null);
//         }}
//         showList={false}
//         uploadLimit={1}
//       >
//         {file ? (
//           <img className="p-3 max-h-[300px]" src={preview} alt="" />
//         ) : (
//           <div className="text-center">
//             {children}
//             <p className="font-semibold">
//               <span className="text-gray-800 dark:text-white">
//                 Drop your image here, or{' '}
//               </span>
//               <span className="text-blue-500">browse</span>
//             </p>
//             <p className="mt-1 opacity-60 dark:text-white">
//               Support: jpeg, png
//             </p>
//           </div>
//         )}
//       </Upload>
//       {/* This hidden input is crucial for handling file uploads in Formik */}
//       <input type="hidden" {...field} />
//     </FormItem>
//   );
// };

// export default DocumentUploadField;


// DocumentUploadField.js
// import React from 'react';
// import { useField } from 'formik';
// import { Upload, FormItem } from '../../../components/ui';

// const DocumentUploadField = ({ label, name, children, touched, errors }) => {
//   const [field, , helpers] = useField(name);
//   const [file, setFile] = React.useState(null);
//   const [preview, setPreview] = React.useState(null);

//   const onFileChange = (files) => {
//     const selectedFile = files[0];

//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//       // Set the value in Formik form
//       helpers.setValue(selectedFile);
//     } else {
//       setFile(null);
//       setPreview(null);
//       // Set null when file is removed
//       helpers.setValue(null);
//     }
//   };

//   return (
//     <FormItem
//       label={label}
//       invalid={errors[name] && touched[name]}
//       errorMessage={errors[name]}
//     >
//       <Upload
//         draggable
//         className="cursor-pointer h-[300px]"
//         onChange={onFileChange}
//         onFileRemove={() => {
//           setFile(null);
//           setPreview(null);
//           // Set null when file is removed
//           helpers.setValue(null);
//         }}
//         showList={false}
//         uploadLimit={1}
//       >
//         {file ? (
//           <img className="p-3 max-h-[300px]" src={preview} alt="" />
//         ) : (
//           <div className="text-center">
//             {children}
//             <p className="font-semibold">
//               <span className="text-gray-800 dark:text-white">
//                 Drop your image here, or{' '}
//               </span>
//               <span className="text-blue-500">browse</span>
//             </p>
//             <p className="mt-1 opacity-60 dark:text-white">
//               Support: jpeg, png
//             </p>
//           </div>
//         )}
//       </Upload>
//     </FormItem>
//   );
// };

// export default DocumentUploadField;
