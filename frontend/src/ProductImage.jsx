import { useState } from "react";
import { ShoppingCart } from "lucide-react";

function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`product-image ${className}`}>
      {failed ? (
        <ShoppingCart size={48} aria-hidden="true" />
      ) : (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export default ProductImage;
