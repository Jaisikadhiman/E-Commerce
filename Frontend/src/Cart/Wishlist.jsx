import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RiEmotionSadFill } from "react-icons/ri";
import axios from "axios";
const Wishlist = () => {
    const queryClient = useQueryClient();

  const fetchItems = async () => {
    const ans = await axios.get("http://localhost:8080/api/wishlist/getItem");
    // console.log("ans :>> ", ans);
    return ans.data.data;
  };

  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchItems,
  });
  console.log("data :>> ", data);
  const deleteItem=async(id)=>{
    const resp = await axios.post(`http://localhost:8080/api/wishlist/deleteItem/${id}`)
    console.log('resp :>> ', resp);
    return resp;
  }
  const mutation= useMutation({
    mutationFn:(id)=>deleteItem(id),
    onSuccess: () => {
        queryClient.invalidateQueries(["wishlist"]);
      },

  })
  const removeItem = (id) => {
    console.log('id :>> ', id);
   mutation.mutate(id) 
  };
  return (
    // <div class="container mt-5">
    //   <h2>Your Wishlist</h2>
    //   {data &&
    //     data?.map((item) => (
    //       <div class="row ">
    //         <div class="col-md-4">
    //           <div class="card">
    //             <img
    //               src={`http://localhost:8080/${item?.cartData?.productImg}`}
    //               class="card-img-top"
    //               alt="Product Image"
    //             />
    //             <div class="card-body ">
    //              <span> <h5 class="card-title">{item?.cartData?.name}</h5></span>
    //               <span>
    //                 {" "}
    //                 <p class="card-text py-2">${item?.cartData?.basePrice}</p>
    //               </span>
    //               <span><h6>{item?.productData?.description}</h6></span>
    //               <div className="d-flex justify-center">
    //                 <button
    //                   class="btn btn-sm "
    //                   onclick="removeItem(1)"
    //                   style={{
    //                     backgroundColor: "#00246B",
    //                     color: "white",
    //                     width: "120px",
    //                   }}
    //                 >
    //                   Add to cart
    //                 </button>

    //               <button
    //                 class="btn btn-danger btn-sm"
    //                 onclick="removeItem(1)"
    //                 style={{ width: "120px" }}
    //               >
    //                 Remove
    //               </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}

    //   {!data && (
    //     <div
    //       id="emptyMessage"
    //       class="text-center mt-4"
    //       style={{ display: "none;" }}
    //     >
    //       <h4>Your wishlist is empty!</h4>
    //     </div>
    //   )}
    // </div>
    <div className="container mt-5">
      <h2>Your Wishlist</h2>
      {data && data.length > 0 ? (
        <div className="row">
          {data.map((item) => (
            <div
              className="col-md-4 d-flex align-items-stretch mb-4"
              key={item?.cartData?.id || item?.productData?.id}
            >
              <div className="card w-100">
                <img
                  src={`http://localhost:8080/${item?.productData?.productImg}`}
                  className="card-img-top"
                  alt="Product Image"
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item?.productData?.name}</h5>
                  <p className="card-text py-2">${item?.productData?.basePrice}</p>
                  <h6>{item?.productData?.description}</h6>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm"
                      onClick={() => addToCart(item)}
                      style={{
                        backgroundColor: "#00246B",
                        color: "white",
                        width: "120px",
                      }}
                    >
                      Add to cart
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => removeItem(item?._id)}
                      style={{ width: "120px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="emptyMessage" className="text-center mt-4">
          <h1>Your wishlist is empty!</h1><RiEmotionSadFill style={{width:"100px" , height:"100px"}}/>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
