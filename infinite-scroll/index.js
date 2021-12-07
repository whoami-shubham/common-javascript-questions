const lastElement = document.getElementById("lastElement");
const container = document.getElementById("container");
const dataFetcher = fetchMoreData(5,100);
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      dataFetcher();
    }
  });
});

observer.observe(lastElement);

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchMoreData(start,end, paginationSize=5) {
  let busy = false;
  let currentIndex = start;
  const maxIndex = end;
  const limit = paginationSize;
  return async () => {
    if (busy || currentIndex > maxIndex) return;
    busy = true;
    // faking asyn call
    await delay(500);
    for (let idx = 1; idx <= limit && currentIndex <= maxIndex; idx++) {
      container.appendChild(createListItem(currentIndex));
      currentIndex++;
    }
    busy = false;
  };
}


function createListItem(index) {
    const fragment = document.createElement("div");
    fragment.classList.add("flex");
    fragment.classList.add("relative");
    fragment.classList.add("pb-12");
    fragment.innerHTML = `<div class="h-full w-10 absolute inset-0 flex items-center justify-center">
    <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
  </div>
  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </div>
  <div class="flex-grow pl-4">
    <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP ${index}</h2>
    <p class="leading-relaxed">VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.</p>
  </div>`;
    return fragment;
  }