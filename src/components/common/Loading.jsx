import React from 'react';
import pokeball from '../../images/pokeball.svg';


const Loading = () => {
  return ( 
    <section className="loading d-flex justify-content-center align-items-center">
      <p className="loading__text">Loading...</p>
        <span className="m-2">
          <div className="spinner-border text-dark loading__spinner" role="status"></div>
        </span>
    </section>
   );
}
 
export default Loading;