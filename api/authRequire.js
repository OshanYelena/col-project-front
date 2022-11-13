import React, { useState, useEffect } from "react";

export const authentication = async (e) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("auth-token");

    if (item) {
      return true;
    } else {
      return false;
    }
  }
};

export const Authaccount =  (e) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("auth-token");
    const type = localStorage.getItem("type");
    
    if (item) {
        if(type === 'admin') return "admin";
        if(type === 'student') return 'student';
        if(type === 'company') return 'company'
    } else {
      return false;
    }
  }
};
