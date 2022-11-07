const regTemplate =(name,email) =>{
return`<div>
<h1 style="color:blue">HII , ${name} welcome to CMS V1.0</h1>
<article style ="margin-auto;object-fit:cover;">
<img src = "https://www.tutorialspoint.com/positive_body_language/positive_body_language_proper_handshake.htm" width:"300" height:"300">
</article>
<h4> we are excited to have you get started with email id =<span style="color :red" >${email}</span></> your account ready to uses..! </h4>
</div>`
}
module.exports = regTemplate