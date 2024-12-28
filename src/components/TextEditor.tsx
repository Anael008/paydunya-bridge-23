import React, { useState } from 'react';
import { Bold, Italic, Underline, Strikethrough, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TextEditor = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/settings" },
    { name: "Blog", path: "/blog" },
    { name: "Payments", path: "/payments" },
    { name: "Orders", path: "/orders" },
    { name: "Clients", path: "/clients" },
    { name: "Withdrawals", path: "/withdrawals" },
    { name: "Refunds", path: "/refunds" },
  ];

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between mb-2 bg-accent"
          >
            Liste des pages
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          {pages.map((page) => (
            <DropdownMenuItem key={page.path}>
              {page.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-1 bg-blue-500 p-1 rounded-t-md">
        <button className="p-1 hover:bg-blue-600 rounded">
          <Bold className="w-4 h-4 text-white" />
        </button>
        <button className="p-1 hover:bg-blue-600 rounded">
          <Italic className="w-4 h-4 text-white" />
        </button>
        <button className="p-1 hover:bg-blue-600 rounded">
          <Underline className="w-4 h-4 text-white" />
        </button>
        <button className="p-1 hover:bg-blue-600 rounded">
          <Strikethrough className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <textarea className="w-full h-64 p-2 border rounded" placeholder="Écrivez votre texte ici..."></textarea>
    </div>
  );
};

export default TextEditor;