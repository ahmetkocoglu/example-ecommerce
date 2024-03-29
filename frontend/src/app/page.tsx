"use client";

import { useEffect, useState } from "react";
import axios from "axios";
//import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
//import {login} from "@/store/apps/login";

export default function Home() {
  // ** Redux
  //const dispatch = useDispatch<AppDispatch>()

  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeletedLoading, setIsDeletedLoading] = useState(false);
  const [isAddBasketLoading, setIsAddBasketLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [movements, setMovements] = useState<any>([]);

  const handleLogin = () => {
    //dispatch(login({email:email, password:password}))
    axios
      .post("http://localhost:3040/users/login", { email, password })
      .then((response: any) => {
        setToken(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token !== "") me();
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:3040/products")
      .then((response: any) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
        .get("http://localhost:3040/movements")
        .then((response: any) => {
          setMovements(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const me = () => {
    axios.defaults.baseURL = "http://localhost:3040/";
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddBasketProduct = (k: any) => {
    if (k.quantity) {
      setIsAddBasketLoading(true);
      axios.defaults.baseURL = "http://localhost:3040/";
      axios
        .post("add-movement", { product_id: k.id, quantity: k.quantity })
        .then((response) => {
          setUser(response.data);
          setTimeout(() => {
            setIsAddBasketLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteProduct = (k: any) => {
    setIsDeletedLoading(true);
    axios.defaults.baseURL = "http://localhost:3040/";
    axios
      .delete("product/" + k.id)
      .then((response) => {
        setTimeout(() => {
          setIsDeletedLoading(false);

          const editProducts = products.map((t: any) => {
            if (t.id === k.id) t.is_delete = !t.is_delete;
            return t;
          });

          setProducts(editProducts);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5 bg-white">
      {token === "" ? (
        <>
          <input
            type="text"
            className="mb-1 text-black border border-gray-600 px-3 py-1"
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            className="mb-1 text-black border border-gray-600 px-3 py-1"
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit" onClick={handleLogin} className="text-black">
            Login
          </button>
        </>
      ) : (
        <>
          <div className="text-black">
            {user.firstName} {user.lastName} {user.phone} {user.email}
          </div>
        </>
      )}
      <hr className="my-2 border border-red-900 w-full" />
      <button
        onClick={() => setIsDeleted(!isDeleted)}
        className="m-1 text-black"
      >
        arşiv ürünlerini {isDeleted ? "gizle" : "göster"}
      </button>
      <div className="text-black">
        {isDeletedLoading && "işleminiz yapılıyor"}
      </div>
      <div className="text-black">
        {isAddBasketLoading && "ürün sepete ekleniyor lütfen bekleyiniz..."}
      </div>
      <div className="text-black">
        {products
          .filter((k: any) => k.is_delete === isDeleted)
          .map((k: any, index: number) => {
            return (
              <div key={index}>
                {k.title} {k.price}
                <input
                  type="number"
                  placeholder="quantity"
                  onChange={(e: any) => (k.quantity = e.target.value)}
                  className="text-black border border-gray-600 rounded ml-3"
                />
                <button
                  onClick={() => handleAddBasketProduct(k)}
                  className="m-1 border border-red-300 rounded px-2"
                >
                  sepete ekle
                </button>
                <button
                  onClick={() => handleDeleteProduct(k)}
                  className="m-1 border border-red-300 rounded px-2"
                >
                  {isDeleted ? "arşivden çıkart" : "arşive gönder"}
                </button>
              </div>
            );
          })}
      </div>
      <div className="text-black">
      {movements.map((k: any, index: number) => {
        return <div key={index}>{k.product.title} {k.quantity} {k.amount}</div>
      })}
      </div>
    </main>
  );
}
