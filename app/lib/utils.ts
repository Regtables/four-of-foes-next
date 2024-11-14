import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const smoothScroll = (target: string) => {
  const element = document.getElementById(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      // block: 'start',
    });
  }
}

export const generateVerificationCode = (codelength = 6) => {
  const codeCharacters = 'ABCDEFGHIJKLMNOPQRSTYWXYZ0123456789'
  
  let code = ''
  
  for(let i = 0; i < codelength; i++){
    const index = Math.floor(Math.random()*codeCharacters.length)
    
    code = code + codeCharacters.charAt(index)
  }

  return code
}