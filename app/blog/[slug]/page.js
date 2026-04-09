"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Calendar, Clock, ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const BlogPostPage = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug);
    }
  }, [params.slug]);

  const fetchBlog = async (slug) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();

      if (response.ok) {
        setBlog(data.blog);
      } else {
        toast.error("Blog post not found");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("An error occurred while loading the blog post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/mv-logo.png"
                alt="MV Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold">MV & Associates</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary transition-colors"
              >
                Blog
              </Link>
              <Button asChild size="sm">
                <Link href="/#contact">Contact</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-primary transition-colors"
                >
                  Blog
                </Link>
                <Button asChild size="sm" className="w-full">
                  <Link href="/#contact">Contact</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-4xl mx-auto">
              <Card className="animate-pulse">
                <CardContent className="p-8">
                  <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : !blog ? (
            <div className="max-w-4xl mx-auto text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The blog post you're looking for doesn't exist or has been
                removed.
              </p>
              <Button asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          ) : (
            <article className="max-w-4xl mx-auto">
              <Button asChild variant="ghost" className="mb-6">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <Card>
                <CardContent className="p-8 md:p-12">
                  {/* Header */}
                  <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(blog.publishedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime} read</span>
                      </div>
                      {blog.category && (
                        <>
                          <span>•</span>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {blog.category}
                          </span>
                        </>
                      )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {blog.title}
                    </h1>
                    {blog.excerpt && (
                      <p className="text-lg text-muted-foreground">
                        {blog.excerpt}
                      </p>
                    )}
                  </header>

                  {/* Content */}
                  <div className="prose prose-slate max-w-none">
                    {blog.content.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="mb-4 text-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Footer */}
                  <footer className="mt-12 pt-8 border-t border-border">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h3 className="font-semibold mb-2">
                        Need Legal Assistance?
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        If you have questions about this topic or need legal
                        representation, don't hesitate to reach out.
                      </p>
                      <Button asChild>
                        <Link href="/#contact">Schedule a Consultation</Link>
                      </Button>
                    </div>
                  </footer>
                </CardContent>
              </Card>
            </article>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/mv-logo.png"
                  alt="MV Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold">MV & Associates</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing exceptional legal services with integrity, dedication,
                and results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Range Of Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Business Law</li>
                <li>Family Law</li>
                <li>Civil Litigation</li>
                <li>Estate Planning</li>
                <li>Real Estate Law</li>
                <li>Criminal Defence</li>
                <li>Investigation Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Phone : +91 8602184060</li>
                <li>Email : mv.associates.legal@gmail.com</li>
                <li>
                  Address : 323 B - Rajul landmark, Napier Town, Jabalpur, Madhya Pradesh, 482001
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © 2024 Sarah Mitchell Law Firm. All rights reserved. | Attorney
              Advertising
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;
