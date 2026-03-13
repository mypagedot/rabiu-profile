"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";

export default function DepositPaymentPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  // New state for payment method
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 50) {
        headerRef.current.classList.add("py-3", "bg-[#1a1a2e]/98");
        headerRef.current.classList.remove("py-[18px]", "bg-[#1a1a2e]/95");
      } else {
        headerRef.current.classList.remove("py-3", "bg-[#1a1a2e]/98");
        headerRef.current.classList.add("py-[18px]", "bg-[#1a1a2e]/95");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FAQ toggle
  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => (prev === index ? null : index));
  };

  // Form submission (mock – replace with real payment gateway / notification)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Custom CSS for pseudo-elements and gradients */}
      <style jsx>{`
        .nav-link-underline::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          background: #1dc9b7;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          width: 70%;
        }
      `}</style>

      {/* ========== HEADER ========== */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg transition-all duration-300 py-4.5"
      >
        <div className="max-w-7xl mx-auto px-5">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="logo text-[#1dc9b7] text-3xl font-extrabold no-underline font-['Montserrat',sans-serif] tracking-tight"
            >
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>
            <ul
              className={`nav-links ${
                mobileMenuOpen ? "flex" : "hidden"
              } md:flex absolute md:static top-full left-0 w-full md:w-auto bg-[#1a1a2e] md:bg-transparent flex-col md:flex-row list-none gap-6 items-center p-6 md:p-0 shadow-lg md:shadow-none z-50 transition-all duration-300`}
            >
              <li>
                <Link
                  href="/"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="nav-cta bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] rounded-[30px] px-5.5 py-2 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block md:inline-block text-center"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <button
              className="mobile-menu block md:hidden text-2xl text-white bg-transparent border-0 p-1 z-1001"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </nav>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section
        className="relative bg-linear-to-br from-[#1a1a2e]/80 to-[#16213e]/85 bg-cover bg-center bg-fixed text-white py-32 md:py-40 mb-20 overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/CTA1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container max-w-7xl mx-auto px-5 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-['Montserrat',sans-serif] uppercase tracking-wide drop-shadow-lg">
              Complete Your <span className="text-[#1dc9b7]">Deposit</span> Payment
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Secure your booking by paying the deposit below. Your event date is reserved once the payment is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* ========== PAYMENT SECTION ========== */}
      <section className="payment-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* PAYMENT FORM */}
            <div className="payment-form-container bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-8">Payment Details</h2>

              {/* Event Summary */}
              <div className="bg-gray-50 p-5 rounded-xl mb-8 border border-gray-200">
                <h3 className="font-semibold text-[#16213e] mb-3">Sample of the Event Summary</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Event:</span> TechCon 2025
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date:</span> May 12–14, 2025
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Location:</span> London, UK
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Deposit due:</span> $500.00
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  The remaining balance is due 30 days before the event.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[#16213e] mb-3">Select payment method</p>
                <div className="flex gap-4 flex-wrap">
                  <label
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-[#0f9b8e] bg-[#0f9b8e]/10"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 accent-[#0f9b8e]"
                    />
                    <span className="font-medium">Credit / Debit Card</span>
                  </label>
                  <label
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "transfer"
                        ? "border-[#0f9b8e] bg-[#0f9b8e]/10"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={paymentMethod === "transfer"}
                      onChange={() => setPaymentMethod("transfer")}
                      className="w-4 h-4 accent-[#0f9b8e]"
                    />
                    <span className="font-medium">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {paymentMethod === "card" ? (
                  /* CARD FIELDS */
                  <>
                    <div className="form-group">
                      <label htmlFor="cardName" className="block text-sm font-semibold text-[#16213e] mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required
                        placeholder="John Doe"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="block text-sm font-semibold text-[#16213e] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="organizer@event.com"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardNumber" className="block text-sm font-semibold text-[#16213e] mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="expiry" className="block text-sm font-semibold text-[#16213e] mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          required
                          placeholder="MM/YY"
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvc" className="block text-sm font-semibold text-[#16213e] mb-2">
                          CVC *
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          required
                          placeholder="123"
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* BANK TRANSFER DETAILS */
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 space-y-4">
                    <h3 className="text-lg font-semibold text-[#16213e] flex items-center gap-2">
                      <i className="fas fa-university text-[#0f9b8e]"></i>
                      Bank Transfer Instructions
                    </h3>
                    <p className="text-gray-700">
                      Please transfer the exact deposit amount to the account below. Use your event name as the reference.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Bank:</span> Access Bank
                      </p>
                      <p>
                        <span className="font-medium">Account Name:</span> Rabiu Muhammad Sani 
                      </p>
                      <p>
                        <span className="font-medium">Account Number:</span> 1493971518
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      After making the transfer, click the button below to notify us. We'll confirm your payment within 24 hours.
                    </p>
                    {/* Email field is still needed to send notification */}
                    <div className="form-group">
                      <label htmlFor="transferEmail" className="block text-sm font-semibold text-[#16213e] mb-2">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        id="transferEmail"
                        name="email"
                        required
                        placeholder="organizer@event.com"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="btn w-full inline-flex items-center justify-center gap-2 px-9 py-4 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === "submitting" ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : paymentMethod === "card" ? (
                    <i className="fas fa-lock"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                  {formStatus === "submitting"
                    ? "Processing…"
                    : paymentMethod === "card"
                    ? "Pay $500.00 Deposit"
                    : "Confirm Transfer Request"}
                </button>

                {formStatus === "success" && (
                  <div className="text-center text-green-600 bg-green-50 p-3 rounded-lg">
                    {paymentMethod === "card"
                      ? "Payment successful! You will receive a confirmation email shortly."
                      : "Transfer request received! We'll notify you once the payment is confirmed."}
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg">
                    Something went wrong. Please try again or contact support.
                  </div>
                )}

                <p className="text-center text-gray-500 text-sm">
                  {paymentMethod === "card"
                    ? "Your payment is secure. We never store your card details."
                    : "We'll send you a confirmation email with these bank details."}
                </p>
              </form>
            </div>

            {/* RIGHT COLUMN – CONTACT & SUPPORT (unchanged) */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mr-5">
                    <i className="fas fa-headset"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">Need Help?</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  If you have any issues with your payment or need to modify your booking, contact us directly.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:rabiusm001@gmail.com?subject=Payment%20Support"
                    className="flex items-center gap-3 py-3 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-green-500 group hover:bg-green-500 hover:text-white"
                  >
                    <i className="fas fa-envelope text-green-600 group-hover:text-white"></i>
                    rabiusm001@gmail.com
                  </a>
                  <a
                    href="https://wa.me/2349123234431?text=Hello%2C%20I%20need%20help%20with%20my%20deposit%20payment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-3 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-[#25D366] group hover:bg-[#25D366] hover:text-white"
                  >
                    <i className="fab fa-whatsapp text-[#25D366] group-hover:text-white"></i>
                    WhatsApp Support
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mr-5">
                    <i className="fas fa-file-invoice"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">Booking Summary</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between">
                    <span>Speaking fee:</span>
                    <span className="font-semibold">$2,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Deposit (40%):</span>
                    <span className="font-semibold text-[#0f9b8e]">$1,000</span>
                  </li>
                  <li className="flex justify-between border-t pt-3">
                    <span>Remaining balance:</span>
                    <span className="font-semibold">$1,500</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  The remaining balance is due 30 days before the event. A detailed invoice will be sent after payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ, FINAL CTA, FOOTER remain exactly as before – omitted here for brevity but must be kept in the actual file */}
    </>
  );
}