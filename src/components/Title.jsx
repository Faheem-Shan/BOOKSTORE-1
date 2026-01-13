// import React from 'react'

// const Title = ({title1,title2,titleStyles,title1Styles,paraStyles,para}) => {
//   return (
//     <div className={titleStyles}>
//       <h3 className={`${title1Styles} h3 capitalize`}>{title1}
//         <span className='font-light underline'></span>
//       </h3>
//       <p className={`${paraStyles} max-w-md mt-2`}>
//         {para ? para:"Discover books that spark curiosity deliver quality and bring inspiration to you everyday reading"}
//       </p>
//     </div>
//   )
// }

// export default Title
import React from 'react';

const Title = ({ title1, title2, titleStyles, title1Styles, paraStyles, para }) => {
  return (
    <div className={titleStyles}>
      <h3 className={`${title1Styles} h3 capitalize`}>
        {title1}
        {/* If you ever want to use a secondary title part, you would put title2 here:
        {title2 && <span className="font-light underline ml-1">{title2}</span>}
        */}
      </h3>
      <p className={`${paraStyles} text-gray-700 max-w-md mt-2`}>
        {/* If 'para' is not provided, it uses the default description */}
        {para ? para : "Discover books that spark curiosity, deliver quality, and bring inspiration to your everyday reading"}
      </p>
    </div>
  
  );
};

export default Title;