#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
moneymatch 지원금 상세페이지 콘텐츠 확장 생성기
- 사실 관계는 subsidies.json의 기존 필드(title/summary/target_text/amount_text/tags/id/official_link)에서만 유도
- sections 생성: 개요/자격 상세/금액 해설/신청 절차/서류·주의사항
- 오류 방지: 템플릿 문장 + 필드 데이터 조합만 사용, 외부 추측 금지
"""
import json, os, re, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, "src", "data")
subs = json.load(open(os.path.join(DATA, "subsidies.json")))
OUT = os.path.join(DATA, "content_sections.json")

# 이미 처리된 것 스킵(재실행 resumable)
done = {}
if os.path.exists(OUT):
    try:
        done = json.load(open(OUT))
    except Exception:
        done = {}

# 절차 안내의 카테고리별 공통 코멘트 (사실 주입 없이 일반 안내만)
CATEGORY_HINT = {
    "생계": "가구 소득인정액과 재산 조건을 종합 심사하므로 사전에 기준 중위소득 대비 본인 가구 수준을 확인하는 ",
    "생활": "선정 조건이 여러 항목으로 나뉘므로 본인 해당 여부를 항목별 하나씩 대조해 보는 ",
    "의료": "진료·수술 전에 본인 부담 경감 절차(사전 신청)가 필요한 경우가 많으므로 시술 일정 전에 신청 완료 상태를 확인하는 ",
    "주거": "공급 유형과 소득·자산 기준에 따라 지원 내용이 달라지므로 본인 유형을 먼저 확실히 하는 ",
    "금융": "가입 기간과 납부 금액에 따라 수령액이 달라지므로 상품 조건을 전체적으로 비교해 보는 ",
    "직업": "신청 시기에 따라 예산 소진 여부가 달라질 수 있으므로 상반기·하반기 모집 일정을 미리 확인하는 ",
    "재취업": "신청 시기에 따라 예산 소진 여부가 달라질 수 있으므로 모집 공고 일정을 미리 확인하는 ",
    "취업": "지원 대상 기업·업종이 제한되는 경우가 있으므로 모집 공고에서 본인 조건 적합성을 확인하는 ",
    "교육": "학자금 지원 구분(유형)에 따라 신청 조건이 다르므로 본인 학적 상태와 소득 구간을 먼저 확인하는 ",
    "교통": "이용 실적에 따라 환급액이 달라지므로 카드 등록과 사용 실적을 꾸준히 관리하는 ",
    "국방": "가입 기간과 납입액에 따라 정부 지원액이 크게 달라지므로 목표 금액에 맞춘 납입 계획을 세우는 ",
    "현금": "지급 방식(월 단위)과 지급 기간이 정해져 있으므로 지급 일정을 미리 확인하는 ",
    "고용": "휴직·복직 일정이 확정된 후 신청하는 흐름이므로 출산전후휴가 등 일정 계획과 함께 준비하는 ",
    "보육": "어린이집 유형(국공립·민간)에 따라 신청 절차가 다르므로 본인 지역 신청 방식을 먼저 확인하는 ",
    "바우처": "바우처 사용처가 지정되어 있으므로 등록된 기관에서 사용 가능한지 미리 확인하는 ",
    "소득": "연금·급여 수급 상태에 따라 지원액이 달라지므로 본인 수급 유형을 먼저 확인하는 ",
    "생계급여": "",  # placeholder
    "기본": "",
}

def pick_hint(category: str) -> str:
    for key in [
        "생계", "의료", "주거", "금융", "취업", "교육", "교통", "국방",
        "현금", "고용", "보육", "바우처", "소득", "재취업", "직업", "생활",
    ]:
        if key in category:
            return CATEGORY_HINT[key]
    return CATEGORY_HINT["기본"]

def clean(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()

HANGUL_JONGSEONG = set("ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ")

def eun_neun(word: str) -> str:
    """종성 유무에 따라 은/는 반환 (한글 조사)"""
    ch = word[-1] if word else ""
    if not ch or not ("\uac00" <= ch <= "\ud7a3"):
        return "은"
    import unicodedata
    decomp = unicodedata.normalize("NFD", ch)
    if len(decomp) >= 3 and decomp[2] in HANGUL_JONGSEONG:
        return "은"
    return "는"

def iga(word: str) -> str:
    """종성 유무에 따라 이/가 반환"""
    ch = word[-1] if word else ""
    if not ch or not ("\uac00" <= ch <= "\ud7a3"):
        return "이"
    import unicodedata
    decomp = unicodedata.normalize("NFD", ch)
    if len(decomp) >= 3 and decomp[2] in HANGUL_JONGSEONG:
        return "이"
    return "가"

def build_sections(s: dict) -> list:
    """사실 주입 없이 기존 필드에서만 확장 섹션을 생성"""
    title = clean(s["title"])
    cat = clean(s["category"])
    tags = [clean(t) for t in s.get("tags", []) if clean(t)]
    summary = clean(s["summary"])
    target = clean(s["target_text"])
    amount = clean(s["amount_text"])
    link = s["official_link"]
    tag_str = " · ".join(tags) if tags else cat
    hint = pick_hint(cat)
    en = eun_neun(title)
    ga = iga(title)

    sections = []

    sections.append({
        "heading": f"{title}, 어떤 제도인가요?",
        "paragraphs": [
            f"{title}{en} {cat} 분야의 정부 지원 제도입니다. {summary}",
            f"이 페이지에서는 {title}의 지원 대상, 지원 혜택, 신청 방법을 항목별로 정리했습니다. "
            f"핵심 키워드는 {tag_str}이며, 각 항목은 공식 기준에 따라 확인 후 신청하는 흐름으로 안내합니다.",
            "정부 지원 제도는 매년 소득 기준과 지원 금액이 갱신되는 경우가 많습니다. "
            "아래 내용을 확인한 뒤에는 반드시 공식 사이트에서 최신 공고를 대조하는 것을 권합니다.",
        ],
    })

    sections.append({
        "heading": f"{title} 지원 대상, 누가 받을 수 있나요?",
        "paragraphs": [
            f"지원 대상 기준은 다음과 같습니다. {target}",
            "여기서 확인해야 할 포인트는 세 가지입니다. "
            "첫째, 소득 기준은 가구 단위로 산정되는 경우가 많아 개인 소득만 보면 안 됩니다. "
            "둘째, 재산 기준이 별도로 적용되는 제도도 있습니다. "
            "셋째, 연령이나 신분(재학·재직·휴직 등) 조건은 신청 시점 기준으로 판단됩니다.",
            "판단이 애매한 경우라면 '적용되지 않는다'고 포기하기 전에 공식 사이트의 자가 진단이나 상담窗口 문의로 "
            "본인 가구 상황을 그대로 안내받고 판단하는 것이 안전합니다.",
        ],
    })

    sections.append({
        "heading": f"{title} 지원 금액과 혜택 상세",
        "paragraphs": [
            f"지원 혜택은 다음과 같습니다. {amount}",
            "금액 관련해서 자주 나오는 질문은 세 가지입니다. "
            "'전액 지원인가요?' — 대부분 소득 수준에 따라 차등 지급되므로 상단의 지원 대상 조건과 연결해서 봐야 합니다. "
            "'매년 동일한가요?' — 기준 중위소득 인상 등으로 금액·기준이 매년 갱신될 수 있습니다. "
            "'다른 지원금과 중복 수령이 되나요?' — 제도별로 중복 제한이 다르므로 공식 안내에서 중복 가능 여부를 확인해야 합니다.",
            "실제 수령액은 개인 상황(소득, 가구 구성, 가입 실적 등)에 따라 달라질 수 있으므로, "
            "상단 금액은 '기준 금액'으로 이해하고 본인 예상액은 공식 안내로 확인하는 정확도가 높습니다.",
        ],
    })

    sections.append({
        "heading": f"{title} 신청 방법과 절차",
        "paragraphs": [
            f"{title}{en} 공식 사이트({link})에서 신청할 수 있습니다. "
            "1) 공식 사이트 접속 후 본인 인증(공동인증서·휴대폰 인증 등) "
            "2) 지원 대상·소득 조건 자가 확인 "
            "3) 신청서 작성 및 서류 제출 "
            "4) 심사 및 결과 통지 "
            "5) 지원 수령(계좌 입금·바우처 등록 등).",
            "온라인 신청이 어려운 경우에는 주민센터·구청·시청 등 오프라인 창구 방문 옵션도 있는 제도가 있습니다. "
            "제도에 따라 방문 신청 창구가 다르므로, 공식 사이트 안내에서 '오프라인 신청' 항목을 함께 확인하세요.",
            f"{hint}것이 좋습니다.",
        ],
    })

    sections.append({
        "heading": f"{title} 신청 시 주의사항",
        "paragraphs": [
            "정부 지원금 신청에서 가장 많이 실수하는 항목을 정리하면 다음과 같습니다.",
            "첫째, 신청 기간 만료. 지원 제도는 연중 상시인 제도와 연중 일정 기간만 모집하는 제도가 나뉩니다. "
            "모집형 제도는 예산 소진 시 조기 마감될 수 있으므로 공고 일정을 먼저 확인해야 합니다.",
            "둘째, 서류 누락. 소득·재산 증빙, 가족관계증명서 등 제출 서류는 제도마다 다르며 발급에 며칠이 걸릴 수 있어 "
            "신청 직전에 서류 목록을 한 번 더 대조하는 것이 좋습니다.",
            "셋째, 정보 불일치. 신청서에 기재한 소득·가구 정보가 증빙 서류와 다르면 심사에서 반려됩니다. "
            "건강보험료 납부내역 등 최신 발급본을 사용해야 합니다.",
            "넷째, 계좌 정보 오류. 지원금은 대부분 본인 명의 계좌로 입금되므로, 계좌 사전 등록이 필요한 제도인지 확인하세요.",
            "마지막으로, 비공개 알선 업체에 수수료를 지불하지 않도록 주의하세요. "
            f"{title}{ga} 공식 사이트({link})에서 무료로 신청할 수 있으며, 공식 채널 이외의 대행은 필요하지 않습니다.",
        ],
    })

    sections.append({
        "heading": "자주 묻는 질문",
        "paragraphs": [],  # FAQ는 별도 렌더링 (기존 details 유지)
    })

    return sections

result = {}
errors = []
for s in subs:
    sid = s["id"]
    if sid in done:
        result[sid] = done[sid]
        continue
    try:
        result[sid] = {"title": s["title"], "category": s["category"], "sections": build_sections(s)}
    except Exception as e:
        errors.append((sid, str(e)))

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=1)

# 통계 출력
total_chars = 0
for sid, v in result.items():
    c = sum(len(clean(p)) for sec in v["sections"] for p in sec["paragraphs"])
    total_chars += c
print("GENERATED:", len(result), "errors:", len(errors))
print("AVG_CHARS_PER_PAGE:", total_chars // max(len(result), 1))
if errors:
    for sid, e in errors:
        print("ERR", sid, e)