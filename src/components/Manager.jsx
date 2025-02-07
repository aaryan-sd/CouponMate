import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
      let passwords = localStorage.getItem("passwords");
      if (passwords) {
          setPasswordArray(JSON.parse(passwords))
      }
  }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPass = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }

    const savePass = async () => {
        if (form.site.length > 3 && form.username.length > 3) {
          setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
          localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
          console.log([...passwordArray, form])
          setform({ site: "", username: "", password: "" })
          toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!');
        }

    }

    const deletePass = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
          setPasswordArray(passwordArray.filter(item=>item.id!==id))
          localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
          toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                progress: undefined,
                theme: "dark",
          });
        }

    }

    const editPass = async(id) => {
      setform(passwordArray.filter(i=>i.id===id)[0]) 
      setPasswordArray(passwordArray.filter(item=>item.id!==id)) 
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

<div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="m-6 text-4xl text-center font-bold text-blue-200">
          
          CouponMate
          
        </h1>
        <div className="flex flex-col p-4 text-white gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-md border border w-full p-4 py-1 bg-gray-800"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Coupon"
              className="rounded-md border border w-full p-4 py-1 bg-gray-800"
              type="text"
              name="username"
              id="username"
            />
            
          </div>
          <button
            onClick={savePass}
            className="flex justify-center items-center gap-2 text-black bg-blue-300 hover:bg-blue-400 rounded-full px-8 py-2 w-fit border-2 border-green-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add
          </button>
        </div>
        <div className="password">
          <h1 className="text-white text-center font-bold text-2xl py-4">
            Your Coupons :-
          </h1>
          {passwordArray.length === 0 && (
            <div className="text-white text-center">No Coupons added</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-fixed w-full text-white rounded-md overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Coupon</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-500">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center overflow-x-auto">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center overflow-x-auto">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      
                      <td className="justify-center py-2 border border-white text-center overflow-x-auto">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editPass(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletePass(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
