export default function PageHeader({ title, subtitle }) {
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
          <nav className="mt-6 flex justify-center">
            <ol className="flex items-center gap-2 text-sm font-default text-(--white-color)/80">
              <li>
                <a
                  href="/"
                  className="hover:text-(--accent-color) transition"
                >
                  Home
                </a>
              </li>
              <li className="opacity-60">/</li>
              <li className="text-(--accent-color) font-semibold">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
