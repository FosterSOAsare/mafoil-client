export type productFilterType = {
  option: string;
  name: string
}



const filters: productFilterType[] = [
  { option: "all", name: "All" },
  { option: "cloth", name: "Clothings" },
  { option: "shoe", name: "Shoes" },
  { option: "bag", name: "Bags" },
  { option: "designer", name: "Designer" },
]


export default filters