import React from "react";

export const Loading = () => {
  return (
    <div className="col-12">
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
      <p>Loading...</p>
    </div>
  );
};

//fa fa-spinner fa-pulse fa-3x fa-fw text-primary
//fa-pulse - makes it spin
//fa-3x - three times the speed
//fa-fw - forward spinning
//text-primary- primary colour to spinner
