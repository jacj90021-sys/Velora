import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { ProductItem } from '../data/products';

interface ProductCardProps {
  product: ProductItem;
  isWishlisted: boolean;
  isCompared?: boolean;
  onToggleWishlist: (product: ProductItem) => void;
  onToggleCompare?: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView?: (product: ProductItem) => void;
  formatPrice?: (price: number) => string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  formatPrice = (p) => `$${p}`,
}) => {
  const [imgError, setImgError] = useState(false);

  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case 'sale':
        return 'bg-[#EA580C] text-white';
      case 'top-rated':
      case 'best-seller':
      case 'new':
      default:
        return 'bg-[#18181B] text-white';
    }
  };

  return (
    <div className="group flex flex-col bg-transparent">
      {/* Product Image Box */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F5F5F5] border border-[#EBEBEB] transition-shadow duration-300 hover:shadow-md">
        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="relative block h-full w-full text-left focus:outline-none"
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#F4F4F5] p-6 text-center text-[#71717A]">
              <span className="text-xs uppercase tracking-wider text-[#A1A1AA]">
                {product.category}
              </span>
              <span className="mt-1 text-sm font-medium text-[#18181B] line-clamp-2">
                {product.name}
              </span>
            </div>
          )}
        </button>

        {/* Top-Left Badge (Top Rated, Best Seller, Sale, New) */}
        {product.badge && (
          <div className="pointer-events-none absolute top-3 left-3 z-10">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide shadow-xs ${getBadgeStyle(
                product.badgeType
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Heart Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-xs backdrop-blur-xs transition-colors duration-150 hover:bg-white ${
            isWishlisted ? 'text-[#DC2626]' : 'text-[#71717A] hover:text-[#18181B]'
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
            strokeWidth={1.75}
          />
        </button>
      </div>

      {/* Product Details Below Image */}
      <div className="mt-3 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="text-left text-[15px] font-medium text-[#18181B] transition-colors hover:text-[#C88D66] truncate"
        >
          {product.name}
        </button>

        {/* Rating Row with Gold Star and count */}
        <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
          <div className="flex items-center text-[#F59E0B]">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="font-medium text-[#18181B]">{product.rating}</span>
          <span>({product.reviewsCount})</span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-0.5">
          {product.oldPrice && (
            <span className="text-xs text-[#A1A1AA] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-base font-semibold text-[#18181B]">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Add to Cart Black Button */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#18181B] py-2 px-4 text-xs font-medium text-white transition-all duration-200 hover:bg-[#27272A] active:scale-[0.98]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
