import React from "react";
import Link from "next/link";

export default function PageHeader({ title, subtitle, breadcrumbs, bgImage, mobileBgImage, className = "min-h-[160px]" }) {
  // Mapping of titles to specific background images (convenient defaults)
  const bgMapping = {
    "About": "/images/new/about us header banner copy.webp",
    "Contact": "/images/new/contact us banner.webp",
    "Unser": "/images/new/blog page banner.webp",
    "Datenschutz": "/images/new/blog page banner.webp",
    "Terms &": "/images/new/blog page banner.webp",
    "Versand &": "/images/new/blog page banner.webp",
    "Häufige": "/images/new/blog detail page banner.webp",
  };

  // Use the passed bgImage prop if available, otherwise fallback to mapping or default
  const activeBg = bgImage || bgMapping[title] || "/images/page-header-bg.jpg";
  const activeMobileBg = mobileBgImage || activeBg;

  // If no breadcrumbs are provided, fallback to default Home / {title}
  let displayBreadcrumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title, href: null },
  ];

  // Filter out any breadcrumbs that don't have a label to prevent trailing separators
  displayBreadcrumbs = displayBreadcrumbs.filter(crumb => crumb && crumb.label);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .page-header-section { background-image: url('${activeMobileBg}'); }
        @media (min-width: 768px) { .page-header-section { background-image: url('${activeBg}'); } }
      `}} />
      <section
        className={`page-header-section bg-(--primary-color) ${className} flex justify-center items-center text-center bg-center bg-cover bg-no-repeat`}
      >
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
    </>
  );
}