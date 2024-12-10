export const BalanceIcon = ({
  fill,
  width,
  height,
  strokeWidth,
}: {
  fill?: string;
  width?: string;
  height?: string;
  strokeWidth?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width={width ? width : '512'}
      height={height ? height : '512'}
      fill={fill ? fill : 'black'}
    >
      <path d="M23.961,14.307l-3.411-8.14c-.416-.994-1.286-1.752-2.327-2.029l-5.723-1.524V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.847L6.059,.897c-.496-.132-1.005-.074-1.451,.123-.031,.006-.062,.006-.091,.018-.068,.029-.124,.072-.171,.122-.381,.234-.698,.575-.881,1.01L.04,10.305h0v.002c-.027,.064-.039,1.194-.039,1.194,0,1.258,.538,2.466,1.466,3.317,.84,.771,1.905,1.183,3.034,1.183,.135,0,.271-.006,.407-.018,2.298-.2,4.093-2.259,4.093-4.689,0,0-.013-.925-.039-.986L5.393,1.832c.135-.012,.273-.005,.409,.032l5.698,1.518V23H4.5c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h15c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-7V3.648l5.466,1.456c.349,.093,.671,.262,.946,.488l-3.869,8.705c-.028,.064-.043,1.203-.043,1.203,0,1.258,.538,2.466,1.466,3.317,.84,.771,1.905,1.183,3.034,1.183,.135,0,.271-.006,.407-.018,2.298-.2,4.093-2.259,4.093-4.689,0,0-.013-.924-.039-.986ZM4.386,2.559c.034-.08,.09-.142,.139-.211l3.222,7.652H1.253L4.386,2.559Zm3.614,8.734c0,1.916-1.399,3.539-3.186,3.694-.998,.089-1.947-.235-2.679-.906-.722-.662-1.136-1.602-1.136-2.581v-.5h7v.292Zm11.604-4.795l.024,.056,3.12,7.447h-6.479l3.335-7.503Zm3.396,8.795c0,1.916-1.399,3.539-3.186,3.694-.999,.086-1.947-.235-2.679-.906-.722-.662-1.136-1.602-1.136-2.581v-.5h7v.292Z" />
    </svg>
  );
};