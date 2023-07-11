import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { closeMenu } from "../utils/appSlice";
// import { json } from "react-router-dom";
import { cacheResult } from "../utils/searchSlice";
const Head = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const searchCache = useSelector((store) => store.search);
  const cache = searchCache[searchQuery];

  const dispatch = useDispatch();

  useEffect(() => {
    //make an api call after every key press
    //but if the difference between two 2 api calls is less than 200ms
    //then decline the api call
    const timer = setTimeout(() => {
      //searching in cache
      if (cache) {
        setSuggestions(cache);
      } else {
        getSearchSuggestions();
      }
    }, 200); //implement debounce
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  async function getSearchSuggestions() {
    console.log("API call-" + searchQuery);
    const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await response.json();
    // console.log(json);
    setSuggestions(json[1]);

    //caching the result by dispatching an action
    dispatch(cacheResult({ [searchQuery]: json[1] }));
  }

  useEffect(() => {
    // this action will keep it close by default
    dispatch(closeMenu());
  }, [dispatch]);

  const toggleMenuhandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="fixed bg-white w-full z-50">
      <div className="grid grid-flow-col p-3 m-2 shadow-lg ">
        <div className="flex col-span-1">
          <img
            onClick={() => toggleMenuhandler()}
            className="h-8 p-2 mx-2 cursor-pointer"
            alt="menu"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFOuFn4GcVY995ptcRxbvZoZEVFFdGtENUg&usqp=CAU"
          />
          <a href="/">
            <img
              className="h-8"
              alt="youtube-logo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdwAAABqCAMAAAAhmRAbAAAAyVBMVEX/////AAAoKCgAAAAaGhodHR0FBQUlJSXT09MRERF2dnYcHBwLCwvb29ttbW3m5ua0tLRGRkb29vbs7Ow3NzdnZ2dAQED/bm6IiIh+fn4WFhbFxcWUlJROTk5WVlbz8/OoqKiamprJyckwMDD/6Oj/9fX/w8OCgoKMjIyqqqr/zc3/Tk7/h4f/mZn/pKT/2tq6urr/Rkb/ICD/FBT/Ly//Pj7/YmL/7u7/ra3/fHz/amr/WFj/kJD/4eH/uLhdXV3/KCj/f3//1NRDTt2MAAAQaElEQVR4nO1d2WKqOhTliIgoikNrLdU6tdXOrR20c3v+/6MuIJC9QwIocIi3rrcWhCSLJHuOJEXj9HRxcvJxe3H2uVzeXF9fv1+9HLw+v13ePz09Pn7P5w8PD38ArD/n8+/Hx6en+8u359eXn6t360c3y8/Ps4vbk5PF4vQ0xkt3yBCnt2efN1cHFoWP8z/p4mFu0f788r78vPjIu5u/DIvbm/e3h2iK0sL36/vyYzeX/wEW1/f/jlaAh7fljt9scfucC7Mufk7y7n9OqHX6AB0jk5e85EmtjetMuiU8yrIKIGdB7u0/3Gd5ePqVa3O5VADQMyD3LG9iHcw54nPrvAExZtyBbmjcpT9Cd434KK/z4MzJFYNbC5yNV9Y1gtJe8IaaDG7Q5GnqIyT10RtCIc/WeXDW5N7mzamPOXtlPqzCAZBbgRsaGhohxtxOimO1EBfF3joPzppcAfZbD5fMBt7pEdxR7Kc9QNL2kpu7nAyxZLWwjbgzR4EbOnDola+UB8jGlpIrzqJs44G5MKOhVfbpywMZDpB2nu4ABVuwPeTmarsIgqnujkwwAGpAohrrWQ6Qg+0kd5E3mzSYI4CmpkmPAOa+mer4uNhOcq/zJpPGBauVeGrSeuwXHPlqBorQtpKbj68gBD+sVtYVOHqUItmawJHXj1IdHxdbSa5wq/Kfe1YzkSKrHuOLNaTlMtTgFLCV5F7kzWUQLHnZwFYKfDGU+ZTQ14oQmE4VXRPHQiXclsvZdJtw5sg1dG0K1WBzmObw+Bh1ZxBoHqtNdK27lmk7S3IP8qYyiBtWO7twsmgNdA0RX6qxfp42kFVFOUzwpCzJFcj06OGA1U6kyioVeKkF9SS1k+bocIHWZdycNZEluXkzycAjs6GIQaTKhvCeGbaC3I+8mWSB2dIvoAypShtcQSaMgA6cDbaCXGE8uRBMr+4QUliC/nBIe0EepDg6fGwFucu8iWThL6ulNbj4QsdQaw/IU2o/xcEJwVaQe5U3kSycMZsKOVTq5P9IBWa4AzPBVpArmEtoBXYcZAVtuuT/yIRRWit+aXNsBbmXeRPJwhWzqSgcQyYSVRfonOokE9tjEFtB7lPeRLLAVHSxRx4IxR3Ocp0ptoHc0wRpXpeZ+ZOe2Y3tAxaJYwiZMCjTlYuBUasZbdaVjfEvyG1ZzY4l+w/ahtEOLllJfEIH0jIj89YTuw89oAwR98AYDo5MU1gb1vdkF5P6KDXTZObklrurdpv7jZCdpjUefRXc7umdyhD17yQBBdbieZqNsD2PHgZ14n3TUP+lbI+tUadkKv58VxVT7wyDQ1XZ6wBMyAC10YUOdDdxye2jnxTI22oTeGHPN0czyS339aLbbkUv8GLCjOkE90/Tm+DeJAYqZ2c8yUTcZkcvI5+87x/YB0I09qSOSmbACatqZmDl3q+ibB0ib7dNeEGBNk8uuXsKehggF+UEFX3hgEVuRYYNV+VARKAzHFO5GOyfXvBjFZJ4c12x5+IxNU59cJKGII9eiCMyYZRARLPR1+mer7pf2m/xH4uUqTa6oMYjF403Ihf9JITcdhMa45zOMuTE2oS+y+ufJ458JmDAl2lvUiPVw4JNLtRoq+66ZgAKyVpt9V1Rgh1fwWxidgUjt60GWy4P6bEYy9zQEC+bJon1kSgsp2mHtd+yyTXA+HjxrVD7BQHNRiEkLKaIgzUEI7fJ+ipLlNhc00L6V1qtakkmHdRGP9I1hjBjMaiRc8etB4YZRKN3uPPWubErLLmDCnO1NXHoDg4JDGCV5ZskyAabGs7SLIzyySEXhmO4+ysMXCOZyz0t2GPUe2ilFIlcpcGRFApo6nbZ+63/FGcJe0/AAG1HSjEai5kwZOEI9Nx1EUD1yM9EMCK4xc4jkcjlAvmpDRlftMRv6m67E0n01ICRcJFaPBYzisoebdCJ1dcJh6zoL7YVFOJkqYqKSe1RMLhZOHLVomnS2woyrE7x67XJXgH3zxE3k9DBsAD/TWnr5ZELF+GVweIOzFGfsDb+sPV62TAaEzRcMJlMNHLNwux8WKcmJ8xLHSjwJVq91pIGYyxl2HcnMUEwzfufqWy93Non0Bxl2qZG4BJSVW9bQnE3nizSooadGCoFI9fVU4+obRWE8yInp/ekAXqzLZEkmWls302ibdzDO49cOEJODjacyr6C00f2Hc8kWUaiijYUlFzdaxj+RKFPBDXYz4pDlNuOlSQePw650uI1MbkvPHIloL7aEtUAqAR+NLqBWfQHBWWEgMQEocgtkjQ2bFwk+W0t+AuSaY4jfI+zIVeSLpJ6ifmPBuEY9vjUQD/9dQsXyCDrLwqxA7qFUORq5FG4FgRhEfnBQFwR/HjtqIUkdmE+A1JSZyDHoSshAUpVEY/qxLsHxuNARxFlLvBJFIlcE7g+7tBHSl6PQ3mJ2A9DUgqltpRE/AkjN6Ez8I37XAOMqjVyM/Jn1XeiIcsjUCF4xRVEIlcHHlmcvEgM56i9QM7CpI8TJZOEkitJJ2+bP5pd08YByAuyaAArka/lt3AWPpgKSEIhe5hQ5IJIjAG2j2ve/oKquwCpH21HlqiRIbnW1rvxusBM0V0B2JKt9kOvgdfLGl7nhuS3aFRUfw8TlVz6We4cbSNzFHgDSqux+p0puZv7JULIBWNRnIGFlhgUj7glFlB1BbJHC0suUun88lsoOh/aNtBXXZ0lSgOLQa60+Nno0ZwgKhstoiAodaC6EqkRCcUokLkSMOI4EJZc3DDN/UyRsIzIRQlx9czJlaSPTYxgIeSC6hhqH/BIBAskNKJ03SmuM+et48KSiz9GT2HHml6J3I4EMGvXyZ7cjZbmMHKHoAsT0hfVvwHVRkHi5wxRIrOisIQiF3+MnvSALVdALzaQHt/PntyzjXb1MHJrTHceGN99Lrk9NCx+CUlhycXt9TaeHnq3SW7H5HayJndTdSiMXIkZhAAsr7jujMYn1xO1hCV3xCQXbTswaQraAGzndqbS8uahVSHSMr1YuSiSQenHJFcTnlwsGnoaO+o/2I4kAw1MtuQmiM8KMWLQ9XndPoJo9E5ccr3JLiy552gH8oKyD5F1tUBux+ROsjM/Jgtn5psfLQwY5AI7VOv/Qy6Wi730qEo8cgvSd0bkJkxE4DsObHwFN10QjU455UPI9YzLW0Ju1Y0iqsclNxuv0GlSh/1rKLmjQOifqpBBjE2ub5jcFnJdYziX3DZFbib+3M/EyX98Z70zHIF1GUaP/S5yC4WRD1zWrpBFmE1iT/0fXmq9DzqQE9VG/23kmj4oLSL9ALkUYmz+RB4ORnUPV9f+beRykXZoa1qB6dzQVlanqbr4O3JdSD+pkptaSkkEuVRcMohG35FLkGo6yW16yWC8dBIP2AhVKMHa6DtyXaSYCHaaZm1fXiKYB+zeKZgw33ZHrovUUjhTrsnNLiFHgI+awecM7ch1kVLytXSWxNLFALP4I4CBQ91Qtu1vI1fnIZ2yCRsFW4Qi6hRsTG5xQ3K3zfzIJnd8xEEaBU+yKFcUdUpyKuT+72zLNJKc47ciN5OavonI/bVeIRoJi4xlUqeId1hjTHLxcRZbTe6a/lwaycoDLjIq6Ms+5CAuub82EoPGaQIHzmtmRxKF+uojyY0dQ+WZPoQllx0gh5R8tRoyTJksq0kR7s6VIsjlRz9i20dJ+OhH3F5PdaPWn5BhErKYdrg7V4oglx+3jMPVxY9bZgelUxkVIcOUIBUvO3CrJngIJXfKzTigTrZnpkSKRO4X/kzdbYTKLQf3N473K93esHE0LtfsdAqhzqv3EGVaDicXR+HooNYnNae9fwtLLpb7vZWmzMsVkka6olSLpqbrJdmuFpl+Uc4UwKsOGI9cnJCugSw/XAjFdwILSy67/o7Bnblwj7Z3aCEPjfpIRC4OsYL5uShXgbgbsiQXlJFdm1yciOsX8cA52bA2PNyj7X7/zZtIFqK4DScXu/LhKdmcC9RqTdbxTcjtMGfbRuTiRFzyeu5ps1AJdCzneRPJAKcKflxyJZM9QamKiSS7CAulIFt7E3LZ++RG5GKxmHQEfYxQpoCrhtO9vJlkINKGEUEuEjJBfBX2AhPrBhavQUrZJuRiEwoY+vXJxdsFWWmQVRIEfqLmOrK1gLpQROxjJLlYXCZ1etH5yqRqAnU/OOm4wakVFEYuZgTs+Djzkksu2PGpCpb+ioI+ExCyjepFOGtGGtX8UkakJhRBbhmXs/HrKSBZBwwKXv5ITlkbn38Rj1xsKCFrKVVLjEcuWGi6OJaIfKQoblslB6Cg8/CcQpgCisucEw5ik4s9ur6UOUTzEGytuEKKrzzVqETgeORSuS6mu/gfUQelcCvIKU2XRCp+Fybion3E/3jRhF7Vf0ni9MsGkT6hKHLpunrHDrtU5qdONFADD6+q2Btle0afIhCPXOpLUfdsdmsVnXoYv7CnWpyOjfa4QsVmkxpqtPDgfqZl9C26LiThTvOLkbEfQS6WXQqKMh2OjvEYwrEa0FO0NDnekx36kGgWi1y6SLsq7x1PZIV+WFi95aouyzodBQdP1aGUab3T7c2OZZaY/pM3mTSit9wocum4ZrVq0sdHQX8CJQQVSFl5pQ7/GYtcStGFD4N74rpl8PHxokNqya6a1PFRXk3aJJE2mSAqDCMGueOoAauiU5jOmTVUHGEFzJGY5DKrOtg3fbXBj7gHWLAKfhRwlUNLqgg7WMeGP88FW5cj/X0xyJUqRV63HahFdKDjQGbfJh+hYt3xyC1zHmZpsGD555CrVJps2mR8rlAj/Os1/QYJJi9HGpbjkBvxact3+PYKc7ZpU6RexCSX3hNclIboCodcfTxmfhsafVp7PezsGQWs4UI57CNSc2OSK9UCObwAco9+XvDEQ+uxtjYBdOC45DL3BM2+haoEziDXmqBdRskPdEakg1afvzYpE2DmEkkbeojDbQxyLXY5e58lv9LTwNp1g/PF7NufP9Bs4pIrTYP06A6X4Ethk+uYMA4DbVEZ52G3+ryzk7Qm2nMyiT3eDJxT/NYnVxrsl1iTVzULR4y7u7S2WVqNPnA2xCZX2tfph61aCL4UNrmrnvQoPUhRyxID3YC6ZKOqz6j7hLFBxlCDVkNeBShN2XfdNeUqpSEoutljHyR9Dg+jVbWi5z4gbzLhycsl2ACdPvl6JgOp11Kbx4Fma8QuCfriygK1Pvi9Kvc559iXv2QTu3wVTa4ED/fO5gTrtRGVl+uhXTkEqDAPqne6P+0US5pZVZzwE12fhJwR3j4slMyidaOpaU1yPnaXvAdOiUOEIf2wWl3V7ddWTd3sE+mtwviJAf5Z8RbUcn1itbto4p8HYPSaqn2fBdPu3tc584x7IcJtIsNrNoAxPu91DyuV6Wx0Vws5/d3CoDyy7pz2GpyZshbaR6Ou9dbR3YYPG5Qbo1lvdBT187Z1X2/WnfWGdzUmszZuc49gfot2GOywKfKdvPOY2+0OG2KZm8b7HJVLv0NyLC6un9M85TgGHg+u/+4W5H+Hk4uzm5/Xt/vHxHX+eJg/3r+9Xi3PdrTmh9PFycnHxdnn8ub6+v3q5fXt8unxe74O5Q8P8+/Hp8u315er9+vrm+Xn2d+Pk8Uihudnh4T4D2iU357seaW9AAAAAElFTkSuQmCC"
            />
          </a>
        </div>
        <div class="col-span-10 px-10">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              class="w-1/2 p-2 px-5 border border-gray-400 rounded-l-full focus:outline-none focus:border-blue-600 "
            />
            <button class="border border-gray-400 hover:bg-gray-300 px-5 py-2 rounded-r-full bg-gray-100">
              <img
                className="h-6 mx-2 "
                alt="searc-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/768px-Search_Icon.svg.png"
              />
            </button>
          </div>
          {/* this div is for displaying list of suggestions */}
          {showSuggestions && (
            <div className="fixed bg-white py-2 px-5 w-[25.5rem] shadow-lg rounded-lg border border-gray-100">
              <ul>
                {suggestions.map((s) => (
                  <li className="py-1 shadown-sm hover:bg-gray-100">🔍{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-1">
          <img
            className="h-8"
            alt="user-icon"
            src="data:image/png;base64,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"
          />
        </div>
      </div>
    </div>
  );
};

export default Head;
