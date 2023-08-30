const loadProduct = async (searchValue = "a") => {
  const productsAll = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
  );
  const products = await productsAll.json();
  const productsData = products.data;
  showProducts(productsData);
  console.log(productsData);
};

const showProducts = (products) => {
  const productAll = document.getElementById("products");
  const showBtn = document.getElementById("showBtn");

  if (products.length > 12) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }

  // products = products.slice(0, 12);
  let content = "";
  products.forEach((product) => {
    content += ` 
    <div class="card border border-[#CFCFCF] rounded-lg p-6">
    <figure class=" bg-[#f3f8ff] h-80">
      <img src='${product.image}'/>
    </figure>
    <div class="card-body items-center text-center space-y-5">
      <h2 class="text-2xl font-bold text-[#403F3F]">${product.phone_name}</h2>
      <div class="card-actions">
        <button onclick="showProductDetails('${product.slug}'); my_modal.showModal();" class="text-xl text-white bg-[#0D6EFD] px-10 py-4 rounded-lg font-semibold cursor-pointer">Show Details</button>
      </div>
    </div>
  </div>
    
    `;
  });

  productAll.innerHTML = content;
  loading(false);
};

const search = () => {
  loading(true);
  const searchText = document.getElementById("serachText");
  const searchValue = searchText.value;
  searchText.value = "";
  loadProduct(searchValue);
};
const loading = (isLoading) => {
  const loadSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadSpinner.classList.remove("hidden");
  } else {
    loadSpinner.classList.add("hidden");
  }
};

const showProductDetails = async (id) => {
  console.log("clicked", id);
  const productDetailsSlug = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const productDetails = await productDetailsSlug.json();
  const singleProduct = productDetails.data;
  const ProductDetailModal = document.getElementById("Product-details-modal");
  ProductDetailModal.innerHTML = `
  
  <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box max-w-[45rem]">


    <div class="card rounded-md">
      <figure class=" bg-[#f3f8ff] h-80">
        <img src="${singleProduct.image}"/>
      </figure>
      <div class="card-body p-0 text-left space-y-2">
        <h2 class="text-2xl font-bold text-[#403F3F]">${singleProduct.name}</h2>
        <p class="text-[#706F6F] text-[14px] leading-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class=""><span class="text-[#403F3F] font-bold">Storage:</span> ${singleProduct.mainFeatures.storage}</p>
        <p class=""><span class="text-[#403F3F] font-bold">Display Size:</span> ${singleProduct.mainFeatures.displaySize}</p>
        <p class=""><span class="text-[#403F3F] font-bold">Chipset:</span> ${singleProduct.mainFeatures.chipSet}</p>
        <p class=""><span class="text-[#403F3F] font-bold">Memory:</span> ${singleProduct.mainFeatures.memory}</p>
        <p class=""><span class="text-[#403F3F] font-bold">Slug:</span> ${singleProduct.mainFeatures.slug}</p>
        <p class=""><span class="text-[#403F3F] font-bold">Release data:</span> ${singleProduct.releaseDate}</p>
        <p class=""><span class="text-[#403F3F] font-bold">Brand:</span> ${singleProduct.brand}</p>
        <p class=""><span class="text-[#403F3F] font-bold">GPS:</span> ${singleProduct.others.GPS}</p>
      </div>
    </div>

    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn bg-rose-600 hover:bg-rose-600 text-white px-8 ">Close</button>
    </div>
  </form>
</dialog>
  
  `;
  my_modal.showModal();

  console.log(singleProduct);
};
loadProduct();
