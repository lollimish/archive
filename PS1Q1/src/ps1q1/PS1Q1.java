package ps1q1;

import java.io.BufferedReader;  
import java.io.DataInputStream;  
import java.io.FileInputStream;  
import java.io.IOException;  
import java.io.InputStreamReader;  
import java.util.ArrayList;  
import java.util.Collections;  
  
  
public class PS1Q1 {  
    static class Job implements Comparable<Job>{  
        int weight;  
        int length;  
        public double val(){  
            return (double)weight/(double)length;  
        }  
        public Job(int w, int l){  
            weight = w; length = l;  
        }  
        @Override  
        public int compareTo(Job arg0) {  
            final int BEFORE = 1;  
            final int EQUAL = 0;  
            final int AFTER = -1;  
            // TODO Auto-generated method stub  
            if (this.val()==arg0.val()){  
                return(this.weight>arg0.weight?(BEFORE):(AFTER));  
            }  
            return(this.val()>arg0.val()?(BEFORE):(AFTER));            
        }  
    }  
  
    /** 
     * @param args 
     */  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        try {  
  
            ArrayList<Job> l = new ArrayList<Job>();  
            FileInputStream fstream = new FileInputStream("/Users/michellepai/NetBeansProjects/jobs.txt");  
            // Get the object of DataInputStream  
            DataInputStream in = new DataInputStream(fstream);  
            BufferedReader br = new BufferedReader(new InputStreamReader(in));  
            String str;  
            str=br.readLine();  
  
            int numJobs = Integer.parseInt(str);  
            while ((str=br.readLine())!= null){  
                String s[] = str.split(" ");  
                l.add(new PS1Q1.Job(Integer.parseInt(s[0]),Integer.parseInt(s[1])));            
            }  
            Collections.sort(l);  
            Collections.reverse(l);  
            int time = 0;  
            long weight = 0;  
            for(Job j : l){  
                weight += j.weight*(time+j.length);  
                time += j.length;                 
            }  
            System.out.println("the final weighth = "+weight);  
  
        } catch ( IOException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
    }  
}  