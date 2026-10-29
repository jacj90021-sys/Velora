import React, { useState } from 'react';
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { BLOG_POSTS, CATEGORIES } from '../data/products';
import {
  PageRoute,
  STORE_LOCATIONS,
  FULL_FAQ_CATEGORIES,
} from '../data/siteRoutes';

interface ContentPagesProps {
  route:
    | 'collections'
    | 'blog'
    | 'blog-single'
    | 'about'
    | 'our-store'
    | 'contact'
    | 'faq'
    | 'terms'
    | 'privacy'
    | 'returns'
    | 'shipping'
    | '404';
  selectedBlogId?: string;
  onSelectBlog: (blogId: string) => void;
  onSelectCategoryForShop: (catName: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const ContentPages: React.FC<ContentPagesProps> = ({
  route,
  selectedBlogId = 'blog-1',
  onSelectBlog,
  onSelectCategoryForShop,
  onNavigate,
}) => {
  const [openFaqKey, setOpenFaqKey] = useState<string>('0-0');
  const [contactSent, setContactSent] = useState(false);
  const [blogComments, setBlogComments] = useState([
    {
      id: 'c-1',
      author: 'Guy Hawkins',
      date: 'August 19, 2026',
      text: 'Switching to an ergonomic solid oak lounge chair and warm sculptural lighting completely transformed my deep work mornings.',
    },
    {
      id: 'c-2',
      author: 'Eleanor Pena',
      date: 'August 20, 2026',
      text: 'Love the minimalist aesthetic of Velora handcrafted furniture. Everything pairs effortlessly, bringing warmth and natural balance to our living room.',
    },
  ]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // =====================================================================
  // 1. COLLECTIONS LIST PAGE (collection.html)
  // =====================================================================
  if (route === 'collections') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <span className="text-[#101010] font-medium">Collections</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#101010]">All Collections</h1>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategoryForShop(cat.name === 'Learn More' ? '' : cat.name)}
                className="group relative overflow-hidden rounded-2xl border border-[#E9E9E9] bg-[#F7F7F7] p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto h-36 w-36 overflow-hidden rounded-full bg-white p-2">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="mt-5 text-lg font-semibold text-[#101010] group-hover:text-[#C88D66]">
                  {cat.name}
                </h4>
                <p className="mt-1 text-xs text-[#696E73] tabular-nums">{cat.count} Products</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#101010] underline group-hover:text-[#C88D66]">
                  <span>Shop Collection</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 2. BLOG LISTING PAGE (blog.html)
  // =====================================================================
  if (route === 'blog') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <span className="text-[#101010] font-medium">Blog</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#101010]">
              Journal & Living Insights
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => onSelectBlog(post.id)}
                  className="overflow-hidden rounded-2xl bg-[#F7F7F7] aspect-[450/560] w-full text-left"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-[#B1B2B7]">{post.date} · Editorial</p>
                  <h3 className="mt-1.5 text-xl font-semibold text-[#101010]">
                    <button
                      type="button"
                      onClick={() => onSelectBlog(post.id)}
                      className="text-left hover:text-[#DC4646] hover:underline"
                    >
                      {post.title}
                    </button>
                  </h3>
                  <p className="mt-2 text-sm text-[#696E73] leading-relaxed">{post.excerpt}</p>
                  <button
                    type="button"
                    onClick={() => onSelectBlog(post.id)}
                    className="mt-3 inline-block border-b border-[#101010] pb-0.5 text-xs font-semibold text-[#101010] hover:border-[#DC4646] hover:text-[#DC4646]"
                  >
                    Read Full Article
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 3. BLOG SINGLE ARTICLE PAGE (blog-single.html)
  // =====================================================================
  if (route === 'blog-single') {
    const activePost = BLOG_POSTS.find((b) => b.id === selectedBlogId) || BLOG_POSTS[0];

    const handleAddComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!commentAuthor.trim() || !commentText.trim()) return;
      setBlogComments((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          author: commentAuthor,
          date: 'Just now',
          text: commentText,
        },
      ]);
      setCommentAuthor('');
      setCommentText('');
    };

    return (
      <div className="pb-20">
        <div className="border-b border-[#E9E9E9] bg-[#F7F7F7] py-3.5">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 flex items-center gap-2 text-xs text-[#696E73]">
            <button type="button" onClick={() => onNavigate('home')}>
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <button type="button" onClick={() => onNavigate('blog')}>
              Blog
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <span className="text-[#101010] font-medium line-clamp-1">{activePost.title}</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-4 sm:px-6 pt-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#DC4646]">
            {activePost.date} · Mindful Tech & Design
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-[#101010] leading-tight">
            {activePost.title}
          </h1>

          <div className="mt-8 overflow-hidden rounded-2xl bg-[#F7F7F7] max-h-[480px]">
            <img
              src={activePost.image}
              alt={activePost.title}
              referrerPolicy="no-referrer"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-8 space-y-5 text-base text-[#696E73] leading-relaxed">
            <p className="text-lg font-medium text-[#101010]">{activePost.excerpt}</p>
            <p>{activePost.content}</p>
            <blockquote className="rounded-2xl border-l-4 border-[#DC4646] bg-[#F7F7F7] p-6 italic text-[#101010]">
              “Technology should never demand your attention—it should quietly amplify your focus,
              rest, and creative clarity.”
            </blockquote>
            <p>
              Whether you are upgrading to precision beryllium wireless earphones or organizing your
              desk with braided 100W USB-C power delivery cables, choosing durable materials makes
              every interaction calmer and more intentional.
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-12 border-t border-[#E9E9E9] pt-10">
            <h4 className="text-xl font-semibold text-[#101010] flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>0{blogComments.length} Comments</span>
            </h4>
            <div className="mt-6 space-y-4">
              {blogComments.map((c) => (
                <div key={c.id} className="rounded-xl border border-[#E9E9E9] p-5">
                  <div className="flex items-center justify-between">
                    <h6 className="font-semibold text-sm text-[#101010]">{c.author}</h6>
                    <span className="text-xs text-[#B1B2B7]">{c.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#696E73]">{c.text}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAddComment}
              className="mt-8 rounded-2xl bg-[#F7F7F7] p-6 space-y-4"
            >
              <h5 className="text-lg font-semibold text-[#101010]">Leave A Comment</h5>
              <input
                type="text"
                required
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="Your Name *"
                className="w-full rounded-lg border border-[#E9E9E9] bg-white px-3.5 py-2.5 text-sm"
              />
              <textarea
                rows={3}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment *"
                className="w-full rounded-lg border border-[#E9E9E9] bg-white px-3.5 py-2.5 text-sm"
              />
              <button
                type="submit"
                className="rounded-full bg-[#101010] px-7 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
        </article>
      </div>
    );
  }

  // =====================================================================
  // 4. ABOUT US PAGE (about.html)
  // =====================================================================
  if (route === 'about') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-12 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#101010]">About Us</h1>
            <p className="mt-2 text-sm text-[#696E73]">
              Design, attention to detail & efficiency to delight the world.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-14 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/assets/images/velora/velora_modern_living_vertical_1773999905260.jpg"
                alt="Velora Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C88D66]">
                Our Story & Craftsmanship
              </span>
              <h2 className="text-3xl font-semibold text-[#101010] leading-tight">
                Curating Enduring Scandinavian Craft & Architecturally Balanced Spaces
              </h2>
              <p className="text-sm sm:text-base text-[#696E73] leading-relaxed">
                Founded in Chicago, Velora designs and handcrafts architectural solid white oak furniture,
                sculptural ambient lighting, and organic textiles. We unite generational European joinery
                with mindful minimalism, curating living spaces that inspire peaceful stillness.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="rounded-xl bg-[#F7F7F7] p-4 text-center">
                  <div className="text-2xl font-bold text-[#101010] tabular-nums">140k+</div>
                  <div className="text-xs text-[#696E73] mt-1">Happy Homes</div>
                </div>
                <div className="rounded-xl bg-[#F7F7F7] p-4 text-center">
                  <div className="text-2xl font-bold text-[#101010] tabular-nums">6</div>
                  <div className="text-xs text-[#696E73] mt-1">Design Galleries</div>
                </div>
                <div className="rounded-xl bg-[#F7F7F7] p-4 text-center">
                  <div className="text-2xl font-bold text-[#101010] tabular-nums">10-Yr</div>
                  <div className="text-xs text-[#696E73] mt-1">Woodcraft Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 5. OUR STORES PAGE (our-store.html)
  // =====================================================================
  if (route === 'our-store') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h1 className="text-3xl font-semibold text-[#101010]">Our Design Galleries</h1>
            <p className="mt-2 text-sm text-[#696E73]">
              Visit our flagship design galleries and experience Velora handcrafted furniture, solid oak dining sets, and tactile fabric swatches in person.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORE_LOCATIONS.map((st) => (
              <div
                key={st.id}
                className="overflow-hidden rounded-2xl border border-[#E9E9E9] bg-white flex flex-col"
              >
                <div className="h-56 overflow-hidden bg-[#F7F7F7]">
                  <img
                    src={st.image}
                    alt={st.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2.5 text-sm">
                  <h4 className="text-lg font-semibold text-[#101010]">{st.name}</h4>
                  <p className="flex items-start gap-2 text-[#696E73]">
                    <MapPin className="h-4 w-4 text-[#101010] shrink-0 mt-0.5" />
                    <span>{st.address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#696E73]">
                    <Phone className="h-4 w-4 text-[#101010] shrink-0" />
                    <span>{st.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#696E73]">
                    <Mail className="h-4 w-4 text-[#101010] shrink-0" />
                    <span>{st.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-[#696E73] pt-1">
                    <Clock className="h-4 w-4 text-[#101010] shrink-0" />
                    <span>{st.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 6. CONTACT US PAGE (contact.html)
  // =====================================================================
  if (route === 'contact') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h1 className="text-3xl font-semibold text-[#101010]">Contact Us</h1>
            <p className="mt-2 text-sm text-[#696E73]">
              Have a question about an order or product compatibility? Our specialists are here 24/7.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6 rounded-2xl bg-[#F7F7F7] p-8">
              <h3 className="text-2xl font-semibold text-[#101010]">Information</h3>
              <div className="space-y-4 text-sm text-[#696E73]">
                <div>
                  <h6 className="font-semibold text-[#101010]">Phone:</h6>
                  <p>(+01) 1234 8888</p>
                </div>
                <div>
                  <h6 className="font-semibold text-[#101010]">Email:</h6>
                  <p>hi.amere@gmail.com</p>
                </div>
                <div>
                  <h6 className="font-semibold text-[#101010]">Address:</h6>
                  <p>600 N Michigan Ave, Chicago, IL 60611, USA</p>
                </div>
                <div>
                  <h6 className="font-semibold text-[#101010]">Open Time:</h6>
                  <p>Monday – Saturday: 09:00 AM – 09:00 PM CST</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-[#E9E9E9] p-8">
              <h3 className="text-2xl font-semibold text-[#101010]">Get In Touch</h3>
              {contactSent ? (
                <div className="mt-6 rounded-xl bg-emerald-50 p-6 text-center text-sm font-semibold text-[#3DAB25]">
                  Thank you! Your message has been received by our Chicago support team.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSent(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      className="rounded-lg border border-[#E9E9E9] px-4 py-3 text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      className="rounded-lg border border-[#E9E9E9] px-4 py-3 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-[#E9E9E9] px-4 py-3 text-sm"
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Message *"
                    className="w-full rounded-lg border border-[#E9E9E9] px-4 py-3 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#101010] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#DC4646] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 7. FAQS PAGE (faq.html)
  // =====================================================================
  if (route === 'faq') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h1 className="text-3xl font-semibold text-[#101010]">Frequently Asked Questions</h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-12 space-y-10">
          {FULL_FAQ_CATEGORIES.map((grp, gIdx) => (
            <div key={grp.category}>
              <h3 className="text-xl font-semibold text-[#101010] mb-4">{grp.category}</h3>
              <div className="space-y-3">
                {grp.items.map((item, iIdx) => {
                  const key = `${gIdx}-${iIdx}`;
                  const isOpen = openFaqKey === key;
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-[#E9E9E9] bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqKey(isOpen ? '' : key)}
                        className="flex w-full items-center justify-between px-6 py-4 text-left text-base font-medium text-[#101010] hover:text-[#DC4646]"
                      >
                        <span>{item.q}</span>
                        {isOpen ? (
                          <Minus className="h-4 w-4 shrink-0" />
                        ) : (
                          <Plus className="h-4 w-4 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-sm text-[#696E73] leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =====================================================================
  // 8. 404 PAGE (404.html)
  // =====================================================================
  if (route === '404') {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="text-7xl font-bold text-[#101010]">404</h1>
        <h3 className="mt-4 text-2xl font-semibold text-[#101010]">
          Oops! That page can’t be found.
        </h3>
        <p className="mt-2 text-sm text-[#696E73] max-w-md mx-auto">
          It looks like nothing was found at this location. Return to our Velora home living collections or
          explore the catalog.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="mt-6 rounded-full bg-[#101010] px-8 py-3.5 text-xs font-semibold text-white hover:bg-[#27272A] transition-colors"
        >
          Back To Homepage
        </button>
      </div>
    );
  }

  // =====================================================================
  // 9. LEGAL & POLICY PAGES (Terms, Privacy, Returns, Shipping)
  // =====================================================================
  const titles: Record<string, string> = {
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    returns: 'Return & Refund Policy',
    shipping: 'Shipping & Delivery Information',
  };

  return (
    <div className="pb-20">
      <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <h1 className="text-3xl font-semibold text-[#101010]">
            {titles[route] || 'Store Policy'}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 space-y-6 text-sm sm:text-base text-[#696E73] leading-relaxed">
        <h4 className="text-lg font-semibold text-[#101010]">
          1. Overview & Velora Craftsmanship Promise
        </h4>
        <p>
          Welcome to Velora. Every piece ordered through our digital galleries is backed by our
          30-day in-home trial, dedicated white glove furniture placement, and our 10-year structural
          woodcraft guarantee covering all joinery and solid timber components.
        </p>
        <h4 className="text-lg font-semibold text-[#101010]">
          2. White Glove Delivery & Logistics
        </h4>
        <p>
          Orders over $150.00 USD qualify for complimentary White Glove delivery. Each piece is meticulously
          inspected, blanket-wrapped, and delivered directly to your room of choice with debris removal
          handled by our specialized carriers from our Chicago and London distribution hubs.
        </p>
        <h4 className="text-lg font-semibold text-[#101010]">
          3. Returns, 30-Day In-Home Trial & Exchanges
        </h4>
        <p>
          If a handcrafted piece does not harmonize perfectly within your space, you may initiate a return
          within 30 days of delivery. Contact our Client Advisory Team at (+01) 1234 8888 or
          client@velora.com to coordinate scheduled in-home carrier retrieval.
        </p>
      </div>
    </div>
  );
};
