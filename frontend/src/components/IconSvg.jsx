import React from 'react';
import "../assets/iconfont-yunphant/iconfont.js"

const IconSvg = (props) => {
  let _props = {...props};
  delete _props["iconName"];
  if (!("style" in _props)) {
    _props["style"] = {margin:"0 8px 0 1px"};
  }
  return (
    <span {..._props}>
    <svg className="icon" 
      aria-hidden="true" 
      fontSize={props.fontSize} 
      color={props.color}> 

      <use xlinkHref={`#${props.iconName}`}></use>

    </svg>
    </span>
  );
};

IconSvg.propTypes = {
};

export default IconSvg;