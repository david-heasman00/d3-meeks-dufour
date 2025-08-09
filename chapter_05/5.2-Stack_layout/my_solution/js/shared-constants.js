const margin = {top: 50, right: 0, bottom: 50, left: 70};
const width = 900;
const height = 350;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const transition_duration = 1000;

const formatsInfo = [
  {id: "vinyl", label: "Vinyl", color: "#5c8c99"},
  {id: "eight_track", label: "8-Track", color: "#a9d9e6"},
  {id: "cassette", label: "Cassette", color: "#0c627a"},
  {id: "cd", label: "CD", color: "#57a3b8"},
  {id: "download", label: "Download", color: "#FFCB96"},
  {id: "streaming", label: "Streaming", color: "#C76C5D"},
  {id: "other", label: "Other", color: "#ADA1A7"},
];