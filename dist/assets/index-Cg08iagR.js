(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const r={cityName:document.getElementById("city-name"),temperature:document.getElementById("temp"),weatherIcon:document.getElementById("weather-icon"),dateTime:document.getElementById("date-time"),title:document.getElementById("title"),maxTemperature:document.getElementById("max-temp"),minTemperature:document.getElementById("min-temp"),humidity:document.getElementById("humidity"),cloudiness:document.getElementById("clouds"),windSpeed:document.getElementById("wind"),searchInput:document.getElementById("search-input"),searchBtn:document.getElementById("btn"),loadingElement:document.getElementById("loading")},u="4bb0324851d437735c61dac4feb4c5e2",d="https://api.openweathermap.org/data/2.5/weather",f={Haze:"/assets/haze.svg",Fog:"/assets/haze.svg",Mist:"/assets/haze.svg",Clouds:"/assets/cloud.svg",Clear:"/assets/sun.svg",Rain:"/assets/rainy.svg",Thunderstorm:"/assets/thunder.svg",Snow:"/assets/icons/snow.svg",Drizzle:"/assets/drizzle-svgrepo-com.svg"};r.searchBtn.addEventListener("click",()=>{const e=r.searchInput.value.trim();e&&(p({city:e}),r.searchInput.value="")});const p=async e=>{const{lat:n,long:o,city:i}=e||{};g(!0);try{const t=i?`${d}?q=${i}&appid=${u}&units=metric`:`${d}?lat=${n}&lon=${o}&appid=${u}&units=metric`,s=await a(t);y(s)}catch(t){console.error("Error fetching weather data:",t.message)}finally{g(!1)}},a=async e=>{const n=await fetch(e);if(!n.ok)throw new Error("Failed to fetch data");return await n.json()},y=e=>{var n,o,i,t,s,c,m,l;r.cityName.innerText=(e==null?void 0:e.name)==="Sāmāir"?"Dhaka":e==null?void 0:e.name,r.temperature.innerText=`${Math.round((n=e==null?void 0:e.main)==null?void 0:n.temp)}°c`,r.dateTime.innerHTML=w(e==null?void 0:e.dt),r.title.innerHTML=E((o=e==null?void 0:e.weather[0])==null?void 0:o.main),r.maxTemperature.innerText=`${Math.round((i=e==null?void 0:e.main)==null?void 0:i.temp_max)}°c`,r.minTemperature.innerText=`${Math.round((t=e==null?void 0:e.main)==null?void 0:t.temp_min)}°c`,r.humidity.innerText=`${(s=e==null?void 0:e.main)==null?void 0:s.humidity}%`,r.cloudiness.innerText=`${(c=e==null?void 0:e.clouds)==null?void 0:c.all}%`,r.windSpeed.innerText=`${(m=e==null?void 0:e.wind)==null?void 0:m.speed} m/s`,r.weatherIcon.src=f[(l=e==null?void 0:e.weather[0])==null?void 0:l.main]||"/assets/cloud.svg"},g=e=>{e?(r.loadingElement.classList.remove("hidden"),r.loadingElement.classList.add("flex")):(r.loadingElement.classList.add("hidden"),r.loadingElement.classList.remove("flex"))},w=e=>{const n=h(e,"time"),o=h(e,"date");return`<p>${n} - ${o}</p>`},E=e=>`<p>The climate is <u class="text-orange-500">${e}</u></p>`;function h(e,n,o){if(!n)return e;e*=1e3;const i=new Date(e),t=n==="date"?{weekday:"long",year:"numeric",month:"long",day:"numeric"}:{hour:"numeric",minute:"numeric"};return new Intl.DateTimeFormat("en-us",t).format(i)}navigator.geolocation.getCurrentPosition(e=>{const{latitude:n,longitude:o}=e.coords;p({lat:n,long:o})});
