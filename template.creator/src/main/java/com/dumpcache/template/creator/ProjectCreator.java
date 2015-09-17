package com.dumpcache.template.creator;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;

public class ProjectCreator {

    public static void main(String[] args) throws Exception {
        if (args.length != 4) {
            System.out.println("cmd format is: ./run.sh targetDir projectName packageName");
            return;
        }

        String baseDir = args[0];

        String targetDir = args[1];

        String projectName = args[2];

        String packageName = args[3];

        String packageDir = packageName.replace(".", "/");

        createDir(targetDir);
        copyApplicationProperties(baseDir, targetDir);
        mergeAndCopyRootPom(projectName, baseDir, targetDir);
        processConfigProject(baseDir, targetDir, projectName, packageName, packageDir);
        processCommonProject(baseDir, targetDir, projectName, packageName, packageDir);
        processDalProject(baseDir, targetDir, projectName, packageName, packageDir);
        processBizProject(baseDir, targetDir, projectName, packageName, packageDir);
        processWebProject(baseDir, targetDir, projectName, packageName, packageDir);
        processDeployProject(baseDir, targetDir, projectName, packageName, packageDir);

        System.out.println();
        System.out.println("creator project:" + projectName + " success !!!");
    }

    private static void processDeployProject(String baseDir, String targetDir, String projectName,
                                             String packageName, String packageDir)
                                                     throws Exception {
        createDir(targetDir + "/" + projectName + ".deploy");

        mergeTemplate(baseDir + "/template.deploy/conf/nginx", "nginx.conf.vm", "nginx.conf",
                new KV[] { new KV("projectName", projectName), new KV("upstream",
                        "#set($ports=$sutil.split(\"7001\",\",\"))\r\n#foreach($port in $ports)\r\nserver 127.0.0.1:$port;\r\n#end") });

        mergeTemplate(baseDir + "/template.deploy", "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });

        copyDir(baseDir + "/template.deploy", targetDir + "/" + projectName + ".deploy");
    }

    private static void processWebProject(String baseDir, String targetDir, String projectName,
                                          String packageName, String packageDir) throws Exception {
        createDir(targetDir + "/" + projectName + ".web");
        mergeTemplate(
                baseDir + "/template.web/src/main/java/com/dumpcache/template/web/action/demo",
                "GeneralAction.java.vm", "GeneralAction.java",
                new KV[] { new KV("packageName", packageName) });

        mergeTemplate(
                baseDir + "/template.web/src/main/java/com/dumpcache/template/web/action/demo",
                "RestfulAction.java.vm", "RestfulAction.java",
                new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.web/src/main/java/com/dumpcache/template/web/vo/demo",
                "Student.java.vm", "Student.java", new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.web/src/main/webapp/WEB-INF",
                "dispatcher-servlet.xml.vm", "dispatcher-servlet.xml",
                new KV[] { new KV("packageName", packageName) });

        copyDir(baseDir + "/template.web/src/main/java/com/dumpcache/template",
                targetDir + "/" + projectName + ".web/src/main/java/" + packageDir);

        copyDir(baseDir + "/template.web/src/main/webapp",
                targetDir + "/" + projectName + ".web/src/main/webapp");

        mergeTemplate(baseDir + "/template.web", "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });
        copyFile("pom.xml", baseDir + "/template.web", targetDir + "/" + projectName + ".web");

    }

    private static void processDalProject(String baseDir, String targetDir, String projectName,
                                          String packageName, String packageDir) throws Exception {
        createDir(targetDir + "/" + projectName + ".dal");
        mergeTemplate(baseDir + "/template.dal/src/main/java/com/dumpcache/template/dal/mapper",
                "StudentMapper.java.vm", "StudentMapper.java",
                new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.dal/src/main/java/com/dumpcache/template/dal/mapper",
                "StudentMapper.xml.vm", "StudentMapper.xml",
                new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.dal/src/main/java/com/dumpcache/template/dal/model",
                "Student.java.vm", "Student.java", new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.dal/src/main/java/com/dumpcache/template/dal/model",
                "StudentExample.java.vm", "StudentExample.java",
                new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.dal/src/main/resources", "generator.xml.vm",
                "generator.xml", new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.dal/src/main/resources", "generator.properties.vm",
                "generator.properties", new KV[] { new KV("projectName", projectName) });

        copyDir(baseDir + "/template.dal/src/main/java/com/dumpcache/template",
                targetDir + "/" + projectName + ".dal/src/main/java/" + packageDir);

        copyDir(baseDir + "/template.dal/src/main/resources",
                targetDir + "/" + projectName + ".dal/src/main/resources");

        mergeTemplate(baseDir + "/template.dal", "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });
        copyFile("pom.xml", baseDir + "/template.dal", targetDir + "/" + projectName + ".dal");

    }

    private static void processConfigProject(String baseDir, String targetDir, String projectName,
                                             String packageName, String packageDir)
                                                     throws Exception {
        createDir(targetDir + "/" + projectName + ".config");

        mergeTemplate(baseDir + "/template.config", "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });
        copyFile("pom.xml", baseDir + "/template.config",
                targetDir + "/" + projectName + ".config");

        mergeTemplate(baseDir + "/template.config/src/main/resources/spring",
                "spring-datasource.xml.vm", "spring-datasource.xml",
                new KV[] { new KV("packageName", packageName) });
        mergeTemplate(baseDir + "/template.config/src/main/resources/spring",
                "spring-service.xml.vm", "spring-service.xml",
                new KV[] { new KV("packageName", packageName) });

        copyDir(baseDir + "/template.config/src/main/resources",
                targetDir + "/" + projectName + ".config/src/main/resources");
    }

    private static void processCommonProject(String baseDir, String targetDir, String projectName,
                                             String packageName, String packageDir)
                                                     throws Exception {
        createDir(targetDir + "/" + projectName + ".common");
        mergeTemplate(
                baseDir + "/template.common/src/main/java/com/dumpcache/template/common/demo/utils",
                "DemoUtils.java.vm", "DemoUtils.java",
                new KV[] { new KV("packageName", packageName) });

        copyDir(baseDir + "/template.common/src/main/java/com/dumpcache/template",
                targetDir + "/" + projectName + ".common/src/main/java/" + packageDir);

        mergeTemplate(baseDir + "/template.common", "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });
        copyFile("pom.xml", baseDir + "/template.common",
                targetDir + "/" + projectName + ".common");

    }

    private static void processBizProject(String baseDir, String targetDir, String projectName,
                                          String packageName, String packageDir) throws Exception {
        createDir(targetDir + "/" + projectName + ".biz");
        mergeTemplate(baseDir + "/template.biz/src/main/java/com/dumpcache/template/biz/demo",
                "HelloService.java.vm", "HelloService.java",
                new KV[] { new KV("packageName", packageName) });

        mergeTemplate(baseDir + "/template.biz/src/main/java/com/dumpcache/template/biz/demo/impl",
                "HelloServiceImpl.java.vm", "HelloServiceImpl.java",
                new KV[] { new KV("packageName", packageName) });

        copyDir(baseDir + "/template.biz/src/main/java/com/dumpcache/template",
                targetDir + "/" + projectName + ".biz/src/main/java/" + packageDir);

        mergeTemplate(baseDir + "/template.biz", "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });
        copyFile("pom.xml", baseDir + "/template.biz", targetDir + "/" + projectName + ".biz");
    }

    private static void mergeAndCopyRootPom(String projectName, String baseDir, String targetDir)
            throws Exception {
        mergeTemplate(baseDir, "pom.xml.vm", "pom.xml",
                new KV[] { new KV("projectName", projectName) });
        copyFile("pom.xml", baseDir, targetDir);
    }

    private static void mergeTemplate(String baseDir, String srcName, String toName, KV... kvs)
            throws Exception {
        VelocityEngine ve = new VelocityEngine();
        Properties p = new Properties();
        p.setProperty(Velocity.ENCODING_DEFAULT, "UTF-8");
        p.setProperty(Velocity.INPUT_ENCODING, "UTF-8");
        p.setProperty(Velocity.OUTPUT_ENCODING, "UTF-8");
        p.put("file.resource.loader.path", baseDir);
        ve.init(p);
        Template temp = ve.getTemplate(srcName);
        VelocityContext vc = new VelocityContext();
        if (kvs != null) {
            for (KV kv : kvs) {
                vc.put(kv.getKey(), kv.getVal());
            }
        }
        OutputStreamWriter os = new OutputStreamWriter(
                new FileOutputStream(baseDir + "/" + toName));
        temp.merge(vc, os);
        os.flush();
    }

    private static void copyApplicationProperties(String baseDir, String targetDir) {
        copyFile("application.properties", baseDir, targetDir);
    }

    private static void copyFile(String name, String baseDir, String targetDir) {
        try {
            int bytesum = 0;
            int byteread = 0;
            if (new File(baseDir, name).exists()) {
                InputStream inStream = new FileInputStream(new File(baseDir, name));
                FileOutputStream fs = new FileOutputStream(new File(targetDir, name));
                byte[] buffer = new byte[1024];
                while ((byteread = inStream.read(buffer)) != -1) {
                    bytesum += byteread;
                    fs.write(buffer, 0, byteread);
                }
                inStream.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static boolean createDir(String dir) {
        File f = new File(dir);
        return f.mkdirs();
    }

    public static void copyDir(String inputname, String outputname) throws IOException {
        (new File(outputname)).mkdirs();
        File[] file = (new File(inputname)).listFiles();
        for (int i = 0; i < file.length; i++) {
            if (file[i].isFile()) {
                file[i].toString();
                FileInputStream input = new FileInputStream(file[i]);
                //mkdir if destination does not exist  
                File outtest = new File(outputname);
                if (!outtest.exists()) {
                    outtest.mkdir();
                }
                FileOutputStream output = new FileOutputStream(
                        outputname + "/" + (file[i].getName()).toString());
                byte[] b = new byte[1024 * 5];
                int len;
                while ((len = input.read(b)) != -1) {
                    output.write(b, 0, len);
                }
                output.flush();
                output.close();
                input.close();
            } else if (file[i].isDirectory()) {
                //System.out.print(file[i].getAbsolutePath()+ "/n" + file[i].getName());  
                System.out.print(file[i].toString() + "," + outputname + "//" + file[i].getName());
                copyDir(file[i].toString(), outputname + "//" + file[i].getName());
            }
        }
    }

    private static class KV {
        String key;
        String val;

        KV(String key, String val) {
            this.key = key;
            this.val = val;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getVal() {
            return val;
        }

        public void setVal(String val) {
            this.val = val;
        }

    }

}
