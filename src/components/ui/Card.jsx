import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function Card({ img, title, price, delay }) {
  return (
    <div
      className="product-item wow fadeInUp h-full"
    >
      <FaderInAnimation direction="up" delay={delay}>
        {/* Image */}
        <div className="product-image relative mb-5 overflow-hidden rounded-2xl p-10 text-center before:absolute before:inset-0 before:h-full before:w-full before:bg-(--accent-color) before:opacity-10">
          <figure className="relative z-1">
            <img
              src={img}
              alt={title}
              className="mx-auto aspect-[1/2.273] max-w-[110px] object-contain"
            />
          </figure>
        </div>

        {/* Content */}
        <div className="product-content text-center">
          <h3 className="mb-2 text-lg font-semibold text-(--primary-color) font-default">{title}</h3>
          {price && (
            <p className="m-0 font-bold text-(--accent-color)">{price}</p>
          )}
        </div>
      </FaderInAnimation>
    </div>
  );
}
