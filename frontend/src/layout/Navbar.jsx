import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../services/wishlistService";
import { ShoppingCart, User, LogOut, Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: !!user,
  });

  const cartCount = wishlistData?.wishlist?.length || 0;

  const navClass = ({ isActive }) =>
    `relative py-2 text-sm font-semibold transition-all duration-250 font-heading tracking-wide ${
      isActive
        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
        : "text-gray-500 hover:text-primary hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:h-[2px] hover:after:w-full hover:after:bg-primary/50 hover:after:rounded-full"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-primary hover:opacity-90 font-heading"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-white shadow-md shadow-primary/20">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="tracking-tighter">wirely<span className="text-accent-teal font-extrabold">.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-10">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/sell" className={navClass}>
            Sell Product
          </NavLink>

          <NavLink to="/wishlist" className={navClass}>
            Wishlist
          </NavLink>

          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/my-products" className={navClass}>
            My Products
          </NavLink>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Cart Icon representing Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-500 hover:text-primary transition duration-200"
            title="Your Wishlist"
          >
            <ShoppingCart size={22} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-primary-light/50 border border-primary/5 px-3 py-1.5 rounded-[8px]">
                <User size={16} className="text-primary" />
                {user.name}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-[8px] border border-red-200 bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700 cursor-pointer"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="rounded-[8px] bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/10 transition hover:bg-primary-hover hover:scale-[1.02]"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Cart Icon */}
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-500 hover:text-primary animate-fade-in"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-gray-500 hover:text-primary transition-transform duration-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-primary/10 bg-white px-6 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-base font-semibold text-gray-600 hover:text-primary"
            >
              Home
            </NavLink>
            <NavLink
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-base font-semibold text-gray-600 hover:text-primary"
            >
              Sell Product
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-base font-semibold text-gray-600 hover:text-primary"
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-base font-semibold text-gray-600 hover:text-primary"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/my-products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-base font-semibold text-gray-600 hover:text-primary"
            >
              My Products
            </NavLink>

            <hr className="my-2 border-primary/5" />

            {user ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-gray-700 bg-primary-light/50 border border-primary/5 px-3 py-2 rounded-[8px]">
                  Logged in as: <strong className="text-primary">{user.name}</strong>
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 rounded-[8px] bg-red-50 py-2.5 text-sm font-semibold text-red-600 border border-red-100 cursor-pointer"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-[8px] bg-primary py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;