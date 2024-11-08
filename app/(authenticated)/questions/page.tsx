import CardComponents from "@/app/Components/CardComponents";
import RetroGrid from "@/components/ui/retro-grid";

export default function Page() {
  const cards = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden py-12 ">
      <RetroGrid className="absolute inset-0 z-0" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-12xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-8 ">
            {cards.map((card) => (
              <CardComponents key={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
