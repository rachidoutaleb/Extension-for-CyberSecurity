# Extension-for-CyberSecurity
I've developed 3 cybersecurity extensions: 
- **All Safe:** This extension defends you against phishing emails, spam, as well as malicious executable files and PDFs.
- **Guide Hardening:** It provides practical recommendations to enhance the security of your computer system. 
- **Scan to Exploit:** This tool analyzes security scan results, identifies vulnerabilities (CVEs), and suggests secure exploitation methods.

## How I Made These Extensions:
- In **All Safe**, use four models, each dedicated to a specific functionality (detecting spam, phishing, malicious executables, and malicious PDFs).
- In **Guide Hardening**, use the PKL model to transform 120 PDFs into a reduced model, then connect it to Pinecone to convert them into vectors. Use Flask to connect the frontend HTML with the backend Python. Connect these vectors with the ChatGPT API to understand user questions and search through Pinecone vectors to display responses based on these hardening recommendation PDFs.
- In **Scan-to-Exploit**, use a prompt that combines a script to pass ChatGPT responses through without filtering, and another prompt that provides responses tailored to my specifications.








# All Safe
![icon12](https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/7c7cd871-e5e5-4773-b262-8217147c200b)

## Functionalities grouped under All Safe:
Phishing emails<br/>
Spam emails<br/>
Malicious executable files<br/>
Malicious PDFs<br/>

## How to Use All Safe :
Open 'allsafe.pdf' in the 'user guide' directory for installation and usage instructions.

## implementation :
https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/fe74af96-aa9e-4f99-81f9-b189ab65fc46

# Guide hardning
![1](https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/43e9324c-00a8-4426-b4dc-24fa5262b38c)



## How to Use Guide Hardening :
Open 'Guide Hardening.pdf' in the 'user guide' directory for installation and usage instructions.

## implementation :
https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/8ea91fd4-3362-45e3-80b5-fa24ec5e7939

# Scan-to-exploit
![image_128x128](https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/99ae6566-4945-4593-8acc-dc62ac37bbbd)


## How to Use scan-to-exploit :
Open 'scan-to-exploit.txt' in the 'user guide' directory for installation and usage instructions.
    
## implementation :
https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/3d5436ca-2e40-4952-824f-895eed36e61f

















