export default function WishlistButton() {
  return (
    <button className="p-2 border border-border-color hover:border-jet-black transition-colors duration-250">
      <span className="sr-only">Add to wishlist</span>
      <span>♥</span>
    </button>
  );
}
