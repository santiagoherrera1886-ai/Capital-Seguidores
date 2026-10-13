/* Competitor gallery: source is the user's original benchmarking file. */
(function () {
  'use strict';
  var D=window.CAPITAL_DATA;
  var root=document.getElementById('capital-gallery');
  if (!D||!root)return;
  var S={scope:'competitors',brand:'ALL',expanded:false};
  var cache={},pending={};
  var $=function(id){return document.getElementById(id);};
  var n=new Intl.NumberFormat('es-CO');
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  function channel(){return $('red').value;}
  function rows(){
    return D.datos.filter(function(d){
      return d.Network===channel()&&d.Ciudades.indexOf($('ciudad').value)!==-1&&Array.isArray(d['Posts destacados'])&&d['Posts destacados'].length;
    });
  }
  function allowed(){
    return rows().filter(function(d){
      if(S.scope==='competitors')return d.Competidor!=='Constructora Capital';
      if(S.scope==='capital')return d.Competidor==='Constructora Capital';
      return true;
    });
  }
  function fetchMedia(){
    var net=channel();
    if(cache[net]||pending[net])return;
    pending[net]=true;
    fetch('./media/posts-'+net.toLowerCase()+'.json')
      .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
      .then(function(map){cache[net]=map; if(channel()===net)render();})
      .catch(function(err){console.warn('Miniaturas no disponibles',err);cache[net]={};if(channel()===net)render();})
      .finally(function(){delete pending[net];});
  }
  function image(p){
    if(typeof p.Imagen==='string'&&p.Imagen.indexOf('data:image/')===0)return p.Imagen;
    var u=(cache[channel()]||{})[p.Enlace];
    return typeof u==='string'&&u.indexOf('data:image/')===0?u:null;
  }
  function labelTopic(value){
    var t=(value||'').toLowerCase();
    if(t.indexOf('sostenib')!==-1||t.indexOf('ambient')!==-1)return 'Sostenibilidad';
    if(t.indexOf('crédito')!==-1||t.indexOf('subsidio')!==-1||t.indexOf('financia')!==-1)return 'Financiación y educación';
    if(t.indexOf('familia')!==-1||t.indexOf('hogar')!==-1||t.indexOf('propietar')!==-1)return 'Hogar y comunidad';
    if(t.indexOf('entrega')!==-1||t.indexOf('proyecto')!==-1||t.indexOf('apartamento')!==-1)return 'Proyectos y vivienda';
    return 'Contenido de marca';
  }
  function card(x,i){
    var p=x.post,brand=x.brand,original=image(p);
    var cap=brand==='Constructora Capital';
    var intro=p.Extracto||'Este contenido no tiene descripción disponible en el archivo.';
    var picture=original
      ?'<img src="'+esc(original)+'" alt="Imagen de la publicación de '+esc(brand)+' tomada del informe original" loading="lazy">'
      :'<div class="gallery-placeholder"><span class="gallery-placeholder-icon" aria-hidden="true">▧</span><span>'+(cache[channel()]?'Este post no trae imagen en el archivo original':'Cargando imagen original…')+'</span></div>';
    var url=p.Enlace&&/^https:\/\//.test(p.Enlace)?'<a href="'+esc(p.Enlace)+'" target="_blank" rel="noopener noreferrer">Abrir publicación ↗</a>':'<small>Sin enlace disponible</small>';
    return '<article class="card post-card gallery-card '+(cap?'gallery-capital':'')+'">'
      +'<div class="post-img">'+picture+'<span class="post-num">#'+(i+1)+' · '+esc(channel())+'</span></div>'
      +'<div class="post-body">'
      +'<span class="gallery-brand">'+esc(brand)+(cap?' ✦':'')+'</span>'
      +'<span class="post-topic">'+esc(labelTopic(intro))+'</span>'
      +'<h3>'+esc(labelTopic(intro))+'</h3>'
      +'<p>'+esc(intro)+'</p>'
      +'<div class="post-bottom"><div><b>'+n.format(Number(p.Interacciones)||0)+'</b><small>interacciones · '+esc(p.Fecha||'Sin fecha')+'</small></div>'+url+'</div>'
      +'</div></article>';
  }
  function render(){
    fetchMedia();
    $('gallery-tabs').querySelectorAll('[data-gallery-scope]').forEach(function(b){
      b.setAttribute('aria-pressed',String(b.getAttribute('data-gallery-scope')===S.scope));
    });
    var available=allowed();
    if(S.brand!=='ALL'&&!available.some(function(d){return d.Competidor===S.brand;}))S.brand='ALL';
    var options='<option value="ALL">'+(S.scope==='capital'?'Constructora Capital':'Todas las constructoras')+'</option>';
    if(S.scope!=='capital'){
      options+=available.slice().sort(function(a,b){return a.Competidor.localeCompare(b.Competidor,'es');}).map(function(d){
        return '<option value="'+esc(d.Competidor)+'">'+esc(d.Competidor)+'</option>';
      }).join('');
    }
    $('gallery-brand').innerHTML=options;
    $('gallery-brand').value=S.brand;
    $('gallery-brand').disabled=S.scope==='capital';
    var chosen=available.filter(function(d){return S.brand==='ALL'||d.Competidor===S.brand;});
    var total=chosen.reduce(function(sum,d){return sum+d['Posts destacados'].length;},0);
    var cards=[];
    chosen.forEach(function(d){
      var posts=d['Posts destacados'].slice().sort(function(a,b){return Number(b.Interacciones)-Number(a.Interacciones);});
      posts.slice(0,S.brand!=='ALL'||S.expanded?5:2).forEach(function(p){cards.push({brand:d.Competidor,post:p});});
    });
    cards.sort(function(a,b){return Number(b.post.Interacciones)-Number(a.post.Interacciones);});
    var best=cards[0],place=$('ciudad').value,net=channel();
    var story=best?'El contenido líder de este grupo es de '+best.brand+', con '+n.format(Number(best.post.Interacciones)||0)+' interacciones. Es un resultado de contenido, no una cifra de ventas.':'No hay publicaciones para este filtro.';
    $('gallery-insight').innerHTML='<div class="gallery-insight-icon" aria-hidden="true">✦</div><div><b>'+chosen.length+' constructoras · '+total+' publicaciones destacadas · '+esc(place)+' / '+esc(net)+'</b><p>'+esc(story)+'</p></div>';
    $('gallery-count').textContent=cards.length+' de '+total+' publicaciones';
    $('gallery-cards').innerHTML=cards.length?cards.map(card).join(''):'<div class="card gallery-empty">No hay publicaciones para esta selección.</div>';
    $('gallery-more').hidden=S.brand!=='ALL'||total<=cards.length;
    $('gallery-more').textContent=S.expanded?'Ver menos publicaciones ↑':'Ver los 5 posts por marca ↓';
  }
  function reset(){S.brand='ALL';S.expanded=false;render();}
  $('gallery-tabs').addEventListener('click',function(e){
    var b=e.target.closest('[data-gallery-scope]');if(!b)return;
    S.scope=b.getAttribute('data-gallery-scope');reset();
  });
  $('gallery-brand').addEventListener('change',function(e){S.brand=e.target.value;S.expanded=false;render();});
  $('gallery-more').addEventListener('click',function(){S.expanded=!S.expanded;render();});
  $('ciudad').addEventListener('change',reset);
  $('red').addEventListener('change',reset);
  $('detail').addEventListener('click',function(e){
    if(!e.target.closest('[data-show-brand]'))return;
    var target=e.target.closest('[data-show-brand]').getAttribute('data-show-brand');
    S.scope=target==='Constructora Capital'?'capital':'competitors';
    S.brand=target==='Constructora Capital'?'ALL':target;
    S.expanded=false;render();
    $('contenidos').scrollIntoView({behavior:'smooth',block:'start'});
  });
  render();
})();