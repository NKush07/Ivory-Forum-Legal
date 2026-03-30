'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Scale, Calendar, Clock, ArrowRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      
      if (response.ok) {
        setBlogs(data.blogs || [])
      } else {
        toast.error('Failed to load blog posts')
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('An error occurred while loading blogs')
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Attorney Sarah Mitchell</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/blog" className="text-sm font-medium text-primary transition-colors">Blog</Link>
              <Button asChild size="sm">
                <Link href="/#contact">Contact</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
                <Link href="/blog" className="text-sm font-medium text-primary transition-colors">Blog</Link>
                <Button asChild size="sm" className="w-full">
                  <Link href="/#contact">Contact</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Insights & Updates</h1>
            <p className="text-lg text-muted-foreground">
              Stay informed about important legal matters, recent law changes, and practical advice for navigating the legal system.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="max-w-4xl mx-auto text-center py-12">
              <p className="text-lg text-muted-foreground mb-6">No blog posts available yet. Check back soon!</p>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                      <CardTitle className="text-2xl">{blog.title}</CardTitle>
                      <CardDescription className="text-base">{blog.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="default" className="group">
                        <Link href={`/blog/${blog.slug}`}>
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-primary" />
                <span className="font-bold">Sarah Mitchell</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing exceptional legal services with integrity, dedication, and results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/#about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Practice Areas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Business Law</li>
                <li>Family Law</li>
                <li>Civil Litigation</li>
                <li>Estate Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>(555) 123-4567</li>
                <li>sarah.mitchell@lawfirm.com</li>
                <li>123 Legal Street, Suite 456</li>
                <li>Downtown, ST 12345</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Sarah Mitchell Law Firm. All rights reserved. | Attorney Advertising</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogPage
