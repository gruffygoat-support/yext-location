import * as React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function Pin({ size = 20 }) {
  return <FaMapMarkerAlt size={size} />;
}

export default React.memo(Pin);
