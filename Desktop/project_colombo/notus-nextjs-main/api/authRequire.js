import React, { useState, useEffect } from "react";

export const authentication = async (e) => {

    if (typeof window !== "undefined") {
        // Perform localStorage action
        const item = localStorage.getItem("auth-token");
      
        if(item){
            return true
        } else {
            return false
        }

      }
};
