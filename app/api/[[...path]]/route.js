import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import archiver from "archiver";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import blogsData from "@/lib/blogData";

function getMimeText(bodyParsed) {
  const { name, email, phone, message, caseType } = bodyParsed;

  return `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCase Type: ${caseType || "N/A"}\n\nMessage:\n${message}\n`;
}

function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function hasEmailConfig() {
  return Boolean(
    process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS,
  );
}

export async function GET(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace("/api", "");

  if (pathname === "/" || pathname === "") {
    return NextResponse.json({
      message: "Law Professional Website API is running",
      status: "healthy",
    });
  }

  if (pathname === "/blogs") {
    return NextResponse.json({ success: true, blogs: blogsData });
  }

  if (pathname.startsWith("/blogs/")) {
    const slug = pathname.replace("/blogs/", "");
    const blog = blogsData.find((item) => item.slug === slug);
    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, blog });
  }

  if (pathname === "/download-code") {
    try {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const chunks = [];

      archive.on("data", (chunk) => chunks.push(chunk));
      archive.on("error", (err) => {
        throw err;
      });

      const appDir = path.join(process.cwd());
      const filesToInclude = [
        "app",
        "components",
        "lib",
        "public",
        "package.json",
        "tailwind.config.js",
        "postcss.config.js",
        "next.config.js",
        ".env.example",
        "README.md",
      ];

      for (const item of filesToInclude) {
        const itemPath = path.join(appDir, item);
        if (fs.existsSync(itemPath)) {
          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            archive.directory(itemPath, item);
          } else {
            archive.file(itemPath, { name: item });
          }
        }
      }

      const envPath = path.join(appDir, ".env");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf-8");
        const envExample = envContent
          .split("\n")
          .map((line) => {
            if (line.includes("=")) {
              const [key] = line.split("=");
              return `${key}=`;
            }
            return line;
          })
          .join("\n");
        archive.append(envExample, { name: ".env.example" });
      }

      await archive.finalize();
      const buffer = Buffer.concat(chunks);

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=law-website-code.zip",
          "Content-Length": buffer.length.toString(),
        },
      });
    } catch (error) {
      console.error("Error creating ZIP:", error);
      return NextResponse.json(
        { error: "Failed to create ZIP file" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
}

export async function POST(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace("/api", "");

  if (pathname === "/contact") {
    try {
      const body = await request.json();
      const { name, email, phone, message, caseType } = body;

      if (!name || !email || !message) {
        return NextResponse.json(
          { error: "Name, email, and message are required" },
          { status: 400 },
        );
      }

      if (!isValidEmail(email)) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 },
        );
      }

      if (!hasEmailConfig()) {
        console.error(
          "Missing email SMTP configuration. Set EMAIL_HOST/EMAIL_USER/EMAIL_PASS in env.",
        );
        return NextResponse.json(
          { error: "Email service not configured" },
          { status: 500 },
        );
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const serverEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
      const contactRecipient = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;

      const mailPayload = {
        from: serverEmail,
        to: contactRecipient,
        subject: `MV & Associates Got an Inquiry From: ${name}`,
        text: getMimeText({ name, email, phone, message, caseType }),
        html: `<h2>New Inquiry Form Submission</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone || "N/A"}</p>
         <p><strong>Case Type:</strong> ${caseType || "N/A"}</p>
         <p><strong>Message:</strong></p>
         <p>${message.replace(/\n/g, "<br/>")}</p>`,
      };

      const info = await transporter.sendMail(mailPayload);

      return NextResponse.json({
        success: true,
        message: "Contact form submitted successfully",
        mailInfo: info,
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return NextResponse.json(
        { error: "Failed to submit contact form" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
}

export async function PUT(request) {
  return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
}

export async function DELETE(request) {
  return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
}
