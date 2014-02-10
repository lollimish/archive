/*
Week 1 Question 1 Total weight: 69119377652
 */
package wk1.pkg1;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

/**
 *
 * @author michellepai
 */
public class Wk11 {

    static class Job implements Comparable<Job> {

        int weight;
        int length;

        Job(int w, int l) {
            this.weight = w;
            this.length = l;

        }

        int val() {
            return weight - length;
        }

        @Override
        public int compareTo(Job j) {
            final int before = 1;
            final int after = -1;
            if (this.val() == j.val()) {
                if (this.weight > j.weight) {
                    return before;
                } else {
                    return after;
                }
            } else {
                if (this.val() > j.val()) {
                    return before;
                } else {
                    return after;
                }
            }
        }

    }

    public static void main(String[] args) throws FileNotFoundException, IOException {
        FileInputStream di = new FileInputStream("/Users/michellepai/NetBeansProjects/jobs.txt");
        DataInputStream in = new DataInputStream(di);
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        ArrayList<Job> l = new ArrayList<>();
        String str = br.readLine();
        int numOfJobs = Integer.parseInt(str);
        System.out.println(numOfJobs);
         while((str = br.readLine())!=null){
             String [] s = str.split(" ");
             l.add(new Wk11.Job(Integer.parseInt(s[0]),Integer.parseInt(s[1])));
             
         }
         
         Collections.sort(l);
         Collections.reverse(l);
         
         int time = 0;
         long weight = 0;
         for(Job j: l){
             weight += j.weight*(time+j.length);  
                time += j.length;
         }
         System.out.print(weight);
         
        

    }
}
