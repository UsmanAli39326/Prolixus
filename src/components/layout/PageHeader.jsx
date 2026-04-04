import React from "react";
import Link from "next/link";

export default function PageHeader({ title, subtitle, breadcrumbs }) {
  // If no breadcrumbs are provided, fallback to default Home / {title}
  let displayBreadcrumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title, href: null },
  ];

  // Filter out any breadcrumbs that don't have a label to prevent trailing separators
  displayBreadcrumbs = displayBreadcrumbs.filter(crumb => crumb && crumb.label);

  return (
    <section className="page-header-section bg-(--primary-color) h-96 flex justify-center items-center  text-center bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/page-header-bg.jpg')" }}>
      <div className="container mx-auto px-4">
        <div className="page-header-box">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-default font-bold text-(--white-color)">
            {title}{" "}
            <span className="font-accent italic font-light">
              {subtitle}
            </span>
          </h1>

          {/* Breadcrumb */}
          <nav className="mt-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-default text-(--white-color)/80">
              {displayBreadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <li className="opacity-60">/</li>}
                  <li>
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-(--accent-color) transition"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-(--accent-color) font-semibold">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
