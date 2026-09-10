// Navegação por botões nativos: clique, Enter/Espaço, Escape e clique externo.
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
const dropdownButton=document.querySelector('.dropdown-toggle');
const submenu=document.querySelector('.submenu');
function setDropdown(open){if(!dropdownButton||!submenu)return;dropdownButton.setAttribute('aria-expanded',String(open));submenu.hidden=!open;}
function setMenu(open){if(!menuButton||!menu)return;menu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));if(!open)setDropdown(false);}
menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
dropdownButton?.addEventListener('click',()=>setDropdown(dropdownButton.getAttribute('aria-expanded')!=='true'));
document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown'))setDropdown(false);if(!event.target.closest('.nav-wrap'))setMenu(false);});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(dropdownButton?.getAttribute('aria-expanded')==='true'){setDropdown(false);dropdownButton.focus();}else if(menuButton?.getAttribute('aria-expanded')==='true'){setMenu(false);menuButton.focus();}});
document.querySelector('.nav-wrap')?.addEventListener('focusout',event=>{if(!event.currentTarget.contains(event.relatedTarget))setMenu(false);});
document.querySelector('.nav-dropdown')?.addEventListener('focusout',event=>{if(!event.currentTarget.contains(event.relatedTarget))setDropdown(false);});
menu?.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
window.matchMedia('(min-width:768px)').addEventListener('change',()=>setMenu(false));
const onlyDigits=value=>value.replace(/\D/g,'');
const masks={cpf:value=>onlyDigits(value).slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2'),telefone:value=>{const v=onlyDigits(value).slice(0,11);return v.length>10?v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'):v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3')},cep:value=>onlyDigits(value).slice(0,8).replace(/(\d{5})(\d)/,'$1-$2')};
Object.entries(masks).forEach(([name,mask])=>{const field=document.querySelector(`[name="${name}"]`);if(field)field.addEventListener('input',()=>{field.value=mask(field.value)})});

const birthDate=document.querySelector('[name="nascimento"]');if(birthDate){const today=new Date();birthDate.max=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-")}

// A validação nativa permanece habilitada; o evento invalid também é capturado.
const form=document.querySelector('#cadastro');
if(form){
 const status=document.querySelector('#form-status');
 const fields=[...form.querySelectorAll('input,select,textarea')];
 const feedback=new Map();
 for(const field of fields){
  const hint=document.createElement('small');hint.id=field.id+'-feedback';hint.className='field-feedback';hint.hidden=true;
  field.closest('label').append(hint);feedback.set(field,hint);
  field.setAttribute('aria-describedby',[field.getAttribute('aria-describedby'),hint.id].filter(Boolean).join(' '));
  field.addEventListener('blur',()=>paint(field));
  field.addEventListener('input',()=>{clearStatus();if(field.dataset.touched)paint(field);});
  field.addEventListener('change',()=>{clearStatus();paint(field);});
 }
 function clearStatus(){status.textContent='';status.className='status';}
 function paint(field){
  field.dataset.touched='true';const hint=feedback.get(field);
  const empty=!field.required&&!field.value.trim();const valid=field.validity.valid;
  field.classList.toggle('is-invalid',!valid);field.classList.toggle('is-valid',valid&&!empty);
  if(valid)field.removeAttribute('aria-invalid');else field.setAttribute('aria-invalid','true');
  hint.hidden=empty;hint.className='field-feedback '+(valid?'success':'error');
  hint.textContent=empty?'':valid?'Preenchimento válido.':field.validationMessage;
 }
 form.addEventListener('invalid',event=>{paint(event.target);status.textContent='Revise os campos indicados antes de continuar.';status.className='status error';},true);
 form.addEventListener('submit',event=>{event.preventDefault();fields.forEach(paint);if(!form.checkValidity()){form.reportValidity();return;}status.textContent='Cadastro validado com sucesso. Demonstração concluída sem envio de dados.';status.className='status success';});
}

// Toast não obstrutivo: permanece até o fechamento explícito, sem limite de leitura.
const toast=document.querySelector('#feedback-toast');
document.querySelector('#show-toast')?.addEventListener('click',()=>{toast.hidden=false;});
document.querySelector('#close-toast')?.addEventListener('click',()=>{toast.hidden=true;document.querySelector('#show-toast').focus();});
// Dialog nativo gerencia foco, fundo inerte e fechamento por Escape.
const guidance=document.querySelector('#guidance-dialog');
document.querySelector('#open-dialog')?.addEventListener('click',()=>guidance.showModal());
guidance?.addEventListener('close',()=>document.querySelector('#open-dialog').focus());
