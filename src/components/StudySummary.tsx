import { STUDY_SUMMARY } from "@schedule/index";

export function StudySummary() {
  return (
    <p className="text-xs leading-relaxed text-stone-600">
      Weekly study (planned): DSA {STUDY_SUMMARY.dsa}h · Java{" "}
      {STUDY_SUMMARY.java}h · K8s {STUDY_SUMMARY.k8s}h · MIVA study{" "}
      {STUDY_SUMMARY.mivaStudy}h · MIVA classes {STUDY_SUMMARY.mivaClasses}h
    </p>
  );
}
