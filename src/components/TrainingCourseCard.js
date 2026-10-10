import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getLearningTrackById } from "@/data/training";

export default function TrainingCourseCard({ product }) {
  const track = getLearningTrackById(product.learningTrack);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 px-1">
        {track ? (
          <Link
            href={`/training/${track.slug}`}
            className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink"
          >
            {track.shortTitle}
          </Link>
        ) : null}
        {product.level ? (
          <span className="rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            {product.level}
          </span>
        ) : null}
      </div>
      <ProductCard product={product} />
    </div>
  );
}
