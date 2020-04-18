export default async function loadData() {
  const response = await fetch("/data.json");
  const answer = await response.json();
  const categories = [
    {
      name: "Home", 
      active: true,
      image: null,
    },
    ...answer.map((e) => ({
      name: e.name,
      active: false,
      image: e.cards.length > 0 ? e.cards[0].image : null,
    })),
    {
      name: "Statistics", 
      active: false,
      image: null,
    },
  ];
  return { categories, answer };
}